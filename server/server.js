const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Use promise-based version
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const secretKey = 'your-secret-key';

app.use(cors());
app.use(express.json());

// สร้างการเชื่อมต่อฐานข้อมูล
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Middleware สำหรับตรวจสอบ token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    next();
  });
};

// Login และส่ง JWT กลับ
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
      const user = rows[0];
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

      const { password, ...userData } = user;
      return res.json({ token, user: userData });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login ผ่านเบอร์โทรศัพท์และส่ง JWT กลับ
app.post('/login-phone', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
    if (rows.length > 0) {
      const user = rows[0];
      const token = jwt.sign({ id: user.id, phone: user.phone }, secretKey, { expiresIn: '1h' });

      const { password, ...userData } = user;
      return res.json({ token, user: userData });
    } else {
      return res.status(401).json({ message: 'Invalid phone number' });
    }
  } catch (error) {
    console.error('Error during phone login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// ดึงข้อมูลผู้ใช้ตาม ID
app.get('/users/:id', authenticate, async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await db.query('SELECT id, first_name, last_name, email, phone, birth_date, gender, profile_image FROM users WHERE id = ?', [userId]);
    if (rows.length > 0) {
      return res.json(rows[0]);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// อัพเดทข้อมูลผู้ใช้
app.put('/users/:id', authenticate, async (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, email, phone, birth_date, gender, profile_image } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, birth_date = ?, gender = ?, profile_image = ? WHERE id = ?',
      [first_name, last_name, email, phone, birth_date, gender, profile_image, userId]
    );

    if (result.affectedRows > 0) {
      return res.json({ message: 'Profile updated successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Register
app.post('/register', async (req, res) => {
  const { email, password, phone, firstName, lastName, birthdate, gender } = req.body;

  if (!email || !password || !phone || !firstName || !lastName || !birthdate || !gender) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const query = 'INSERT INTO users (email, password, phone, first_name, last_name, birth_date, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await db.query(query, [email, password, phone, firstName, lastName, birthdate, gender]); // Added await
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
});


app.get('/getAllConcerts', (req, res) => {
  const query = 'SELECT * FROM concerts'; // ดึงข้อมูลทั้งหมดจาก concerts
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get("/getZones", (req, res) => {
  const { concert_id } = req.query;

  if (!concert_id) {
    return res.status(400).json({ error: "concert_id is required" });
  }

  const query = "SELECT * FROM zones WHERE concert_id = ?";

  db.query(query, [concert_id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.get('/api/seats/:zoneId', async (req, res) => {
  const { zoneId } = req.params;
  try {
    console.log('กำลังดึงข้อมูลที่นั่งสำหรับโซน:', zoneId);

    // ใช้ db.promise().query() เพื่อรองรับ async/await
    const [rows] = await db.promise().query('SELECT * FROM seats WHERE zone_id = ?', [zoneId]);
    console.log('ข้อมูลที่นั่ง:', rows);

    if (!rows || rows.length === 0) {
      console.log(`ไม่พบที่นั่งสำหรับ zoneId: ${zoneId}`);
      return res.status(404).send('ไม่พบที่นั่ง');
    }

    res.json(rows);
  } catch (error) {
    console.error("ข้อผิดพลาดฐานข้อมูล:", error);
    res.status(500).send('เกิดข้อผิดพลาดของเซิร์ฟเวอร์');
  }
});




// API เพื่ออัปเดตสถานะที่นั่ง (Backend)
app.post('/api/update-seat', async (req, res) => {
  const { seatNumber, status } = req.body; // รับ seatNumber แทน seatId
  try {
    const query = 'UPDATE seats SET is_reserved = ? WHERE seat_number = ?'; // ใช้ seat_number แทน id
    await db.execute(query, [status, seatNumber]); // ใช้ seatNumber แทน
    res.status(200).send('Seat updated successfully');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


app.get('/getAllConcertsthaiMass', (req, res) => {
  const query = 'SELECT * FROM conthaiMass'; // ดึงข้อมูลทั้งหมดจาก concerts
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/getAllConcertstpop', (req, res) => {
  const query = 'SELECT * FROM contpop'; // ดึงข้อมูลทั้งหมดจาก concerts
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/getAllConcertskpop', (req, res) => {
  const query = 'SELECT * FROM conkpop'; // ดึงข้อมูลทั้งหมดจาก concerts
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/getAllConcertsinter', (req, res) => {
  const query = 'SELECT * FROM coninter'; // ดึงข้อมูลทั้งหมดจาก concerts
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/concertsImage', async (req, res) => {
  const query = 'SELECT * FROM concert_image'; // ดึงข้อมูลทั้งหมดจาก concerts
  try {
    const [results] = await db.query(query);
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  } catch (err) {
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
});

app.get('/concertsDetail', async (req, res) => {
  const query = 'SELECT * FROM concert_detail';
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

// ดึงข้อมูล Sports
app.get('/getAllSports', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sports');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ดึงข้อมูล Sports ตามประเภท
app.get('/getSportsByType/:type', async (req, res) => {
  const { type } = req.params;
  try {
    let query = 'SELECT * FROM sports';
    const params = [];
    if (type !== 'ALL') {
      query += ' WHERE type = ?';
      params.push(type);
    }
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports by type:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllSportsBoxing', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sports WHERE type = "boxing"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllSportsFootball', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sports WHERE type = "football"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllSportsOther', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sports WHERE type = "other"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route สำหรับดึงข้อมูลกีฬาและภาพ
app.get('/sportsImage', async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM sport_images');
    res.json(result);
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

//  สำหรับดึงข้อมูลรูปภาพของsport
app.get("/getImages", async (req, res) => {
  try {
    const [results] = await db.query("SELECT image FROM images");
    res.json(results); // ส่งข้อมูลภาพในรูปแบบ JSON
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).send("Error fetching images");
  }
});

app.get('/getAllSportsBoxing', async (req, res) => {
  const query = 'SELECT * FROM boxing'; // ดึงข้อมูลทั้งหมดจาก concerts
  try {
    const [results] = await db.query(query);
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  } catch (err) {
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
});


app.get('/getAllProduct', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM product');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//ProductConcert
app.get('/getAllflashsale', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flashsalepro');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching flash sale products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/getAllshirtcon', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM shirtconpro');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concert shirts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllligthstickcon', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM lightstickcon');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concert lightsticks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllAlbumcon', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM albumcon');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concert albums:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});









// ProductSport
app.get('/getAllflashsaleSport', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flashsalesport');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports flash sale products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllshirtsport', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM shirtsport');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports shirts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllscarfsport', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM scarfsport');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports scarves:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllshoesport', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM shoesport');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports shoes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







//Information


app.get('/getInformationbook', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM informationbook');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching information books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/getInformationdetail', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM informationdetail');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching information details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAdditionalInformation', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM additionalinformation');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching additional information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/getEventPoster', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM eventposter');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching event posters:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






app.get('/getAllSportsFootball', async (req, res) => {
  const query = 'SELECT * FROM football';
  try {
    const [results] = await db.query(query);
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
});

app.get('/getAllSportsOther', async (req, res) => {
  const query = 'SELECT * FROM other';
  try {
    const [results] = await db.query(query);
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
});

// Route สำหรับดึงข้อมูลกีฬาและภาพ
app.get('/sportsImage', async (req, res) => {
  const query = 'SELECT * FROM sport_images';
  try {
    const [result] = await db.query(query);
    res.json(result);
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

//  สำหรับดึงข้อมูลรูปภาพของsport
app.get("/getImages", async (req, res) => {
  // ดึงข้อมูลจากฐานข้อมูล
  try {
    const [results] = await db.query("SELECT image FROM images");
    res.json(results); // ส่งข้อมูลภาพในรูปแบบ JSON
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).send("Error fetching images");
  }
});

// product สำหรับดึงข้อมูลภาพ
app.get('/getproductImage', async (req, res) => {
  const query = 'SELECT * FROM product_image';
  try {
    const [result] = await db.query(query);
    res.json(result);
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

// promotion สำหรับดึงข้อมูลภาพ
app.get('/getpromotionImage', (req, res) => {
  const query = 'SELECT image FROM promotion_image';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
    return res.json(result);
  });
});

// promotion สำหรับดึงข้อมูล
app.get('/getpromotionDetail', async (req, res) => {
  const query = 'SELECT * FROM promotion_detail';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
    return res.json(result);
  });
});

// promotion สำหรับดึงข้อมูล
app.get('/getproconsport', (req, res) => {
  const query = 'SELECT * FROM pro_consport';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
    return res.json(result);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add Concert
app.post('/addConcert', async (req, res) => {
  const { name, date, location, price, available_seats, type } = req.body;
  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    await db.query('INSERT INTO concerts (name, date, location, price, available_seats, type) VALUES (?, ?, ?, ?, ?, ?)', [name, date, location, price, available_seats, type]);
    return res.status(201).json({ message: 'Concert added successfully' });
  } catch (error) {
    console.error('Error adding concert:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// promotion สำหรับดึงข้อมูล
app.get('/getproconsport', async (req, res) => {
  const query = 'SELECT * FROM pro_consport';
  try {
    const [result] = await db.query(query);
    res.json(result);
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

// API สำหรับดึงข้อมูลจากฐานข้อมูล
app.get('/getConcertstage', async (req, res) => {
  const query = 'SELECT * FROM concert_stage'; // ตัวอย่าง query เพื่อดึงข้อมูล
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add concert
app.post('/addConcert', async (req, res) => {
  const { name, date, location, price, available_seats, type } = req.body;
  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    await db.query('INSERT INTO concerts (name, date, location, price, available_seats, type) VALUES (?, ?, ?, ?, ?, ?)', [name, date, location, price, available_seats, type]);
    return res.status(201).json({ message: 'Concert added successfully' });
  } catch (error) {
    console.error('Error adding concert:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Update Concert
app.put('/updateConcert/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, available_seats, type } = req.body;
  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `
    UPDATE concerts SET name = ?, date = ?, location = ?, price = ?, available_seats = ?, type = ?
    WHERE id = ?
  `;
  try {
    const [result] = await db.query(query, [name, date, location, price, available_seats, type, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Concert not found.' });
    }
    res.status(200).json({ message: 'Concert updated successfully' });
  } catch (err) {
    console.error('Database Error:', err.message);
    return res.status(500).json({ message: 'Database error' });
  }
});

// Delete Concert
app.delete('/deleteConcert/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM concerts WHERE id = ?';
  try {
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Concert not found.' });
    }
    res.status(200).json({ message: 'Concert deleted successfully' });
  } catch (err) {
    console.error('Database Error:', err.message);
    return res.status(500).json({ message: 'Database error' });
  }
});



// Add sport
app.post('/addSport', async (req, res) => {
  const { name, date, location, price, available_seats, type } = req.body;

  // Validate input
  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const sql = `INSERT INTO sports (name, date, location, price, available_seats) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, date, location, price, availableSeats];

    // Using promise-based query
    await db.promise().query(sql, values);  // This ensures it returns a promise.

    res.status(201).json({ message: 'Sport added successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update sport
app.put('/updateSport/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, available_seats, type } = req.body;

  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `
    UPDATE sports SET name = ?, date = ?, location = ?, price = ?, available_seats = ?, type = ?
    WHERE id = ?
  `;
  try {
    const [result] = await db.query(query, [name, date, location, price, available_seats, type, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sport not found.' });
    }
    res.status(200).json({ message: 'Sport updated successfully' });
  } catch (err) {
    console.error('Database Error:', err.message);
    return res.status(500).json({ message: 'Database error' });
  }
});

// Delete sport
app.delete('/deleteSport/:id', async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM sports WHERE id = ?';
  try {
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    res.status(200).json({ message: 'Sport deleted successfully' });
  } catch (err) {
    console.error('Error deleting sport:', err);
    return res.status(500).json({ message: 'Database error', error: err.message });
  }
});

// Fetch all users
app.get('/getAllUsers', authenticate, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, email, password, phone, first_name, last_name, birth_date, address, gender, role, created_at, profile_image FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add User
app.post('/addUser', authenticate, async (req, res) => {
  const { email, password, phone, first_name, last_name, birth_date, address, gender, role, profile_image } = req.body;
  if (!email || !password || !phone || !first_name || !last_name || !birth_date || !address || !gender || !role || !profile_image) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const [result] = await db.query('INSERT INTO users (email, password, phone, first_name, last_name, birth_date, address, gender, role, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, password, phone, first_name, last_name, birth_date, address, gender, role, profile_image]);
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    return res.status(201).json(user[0]);
  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update User
app.put('/updateUser/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { email, password, phone, first_name, last_name, birth_date, address, gender, role, profile_image } = req.body;
  if (!email || !phone || !first_name || !last_name || !birth_date || !address || !gender || !role || !profile_image) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const [result] = await db.query('UPDATE users SET email = ?, password = ?, phone = ?, first_name = ?, last_name = ?, birth_date = ?, address = ?, gender = ?, role = ?, profile_image = ? WHERE id = ?', [email, password, phone, first_name, last_name, birth_date, address, gender, role, profile_image, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return res.status(200).json(user[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete User
app.delete('/deleteUser/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch all orders
app.get('/getAllOrders', authenticate, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add Order
app.post('/addOrder', authenticate, async (req, res) => {
  const { user_id, concert_id, sport_id, product_id, quantity, total_price, status } = req.body;
  if (!user_id || !quantity || !total_price || !status) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const [result] = await db.query('INSERT INTO orders (user_id, concert_id, sport_id, product_id, quantity, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)', [user_id, concert_id, sport_id, product_id, quantity, total_price, status]);
    const [order] = await db.query('SELECT * FROM orders WHERE id = ?', [result.insertId]);
    return res.status(201).json(order[0]);
  } catch (error) {
    console.error('Error adding order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update Order
app.put('/updateOrder/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { user_id, concert_id, sport_id, product_id, quantity, total_price, status } = req.body;
  if (!user_id || !quantity || !total_price || !status) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const [result] = await db.query('UPDATE orders SET user_id = ?, concert_id = ?, sport_id = ?, product_id = ?, quantity = ?, total_price = ?, status = ? WHERE id = ?', [user_id, concert_id, sport_id, product_id, quantity, total_price, status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    const [order] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    return res.status(200).json(order[0]);
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Order
app.delete('/deleteOrder/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM orders WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
