const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
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
  database: 'ticket_db',
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

    await db.query(
      'INSERT INTO users (email, password, phone, first_name, last_name, birth_date, gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [email, password, phone, firstName, lastName, birthdate, gender]
    );
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// ดึงข้อมูล Concerts
app.get('/getAllConcerts', authenticate, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM concerts');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concerts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ดึงข้อมูล Concerts ตามประเภท
app.get('/getConcertsByType/:type', async (req, res) => {
  const { type } = req.params;
  try {
    let query = 'SELECT * FROM concerts';
    const params = [];
    if (type !== 'ALL') {
      query += ' WHERE type = ?';
      params.push(type);
    }
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concerts by type:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/concertsImage', (req, res) => {
  const query = 'SELECT * FROM concert_image'; // ดึงข้อมูลทั้งหมดจาก concerts
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/concertsDetail', (req, res) => {
  const query = 'SELECT * FROM concert_detail';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
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

app.get('/getAllSportsBoxing', (req, res) => {
  const query = 'SELECT * FROM boxing'; // ดึงข้อมูลทั้งหมดจาก concerts
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});


app.get('/getAllProduct', (req, res) => {
  const query = 'SELECT * FROM product'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});



//ProductConcert
app.get('/getAllflashsale', (req, res) => {
  const query = 'SELECT * FROM flashsalepro'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});


app.get('/getAllshirtcon', (req, res) => {
  const query = 'SELECT * FROM shirtconpro'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/getAllligthstickcon', (req, res) => {
  const query = 'SELECT * FROM lightstickcon LIMIT 6'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/getAllAlbumcon', (req, res) => {
  const query = 'SELECT * FROM albumcon'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});









// ProductSport
app.get('/getAllflashsaleSport', (req, res) => {
  const query = 'SELECT * FROM flashsalesport'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/getAllshirtsport', (req, res) => {
  const query = 'SELECT * FROM shirtsport'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/getAllscarfsport', (req, res) => {
  const query = 'SELECT * FROM scarfsport'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/getAllshoesport', (req, res) => {
  const query = 'SELECT * FROM shoesport'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});







//Information


app.get('/getInformationbook', (req, res) => {
  const query = 'SELECT * FROM informationbook'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});


app.get('/getInformationdetail', (req, res) => {
  const query = 'SELECT * FROM informationdetail'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

app.get('/getAdditionalInformation', (req, res) => {
  const query = 'SELECT * FROM additionalinformation'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});


app.get('/getEventPoster', (req, res) => {
  const query = 'SELECT * FROM eventposter'; // ดึงข้อมูลทั้งหมดจาก product
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});






app.get('/getAllSportsFootball', (req, res) => {
  const query = 'SELECT * FROM football';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results);
  });
});

app.get('/getAllSportsOther', (req, res) => {
  const query = 'SELECT * FROM other';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results);
  });
});

// Route สำหรับดึงข้อมูลกีฬาและภาพ
app.get('/sportsImage', (req, res) => {
  const query = 'SELECT * FROM sport_images';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(result);
    }
  });
});

//  สำหรับดึงข้อมูลรูปภาพของsport
app.get("/getImages", (req, res) => {
  // ดึงข้อมูลจากฐานข้อมูล
  db.query("SELECT image FROM images", (err, results) => {
    if (err) {
      console.error("Error fetching images:", err);
      return res.status(500).send("Error fetching images");
    }
    res.json(results); // ส่งข้อมูลภาพในรูปแบบ JSON
  });
});

// product สำหรับดึงข้อมูลภาพ
app.get('/getproductImage', (req, res) => {
  const query = 'SELECT * FROM product_image';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(result);
    }
  });
});

// promotion สำหรับดึงข้อมูลภาพ
app.get('/getpromotionImage', (req, res) => {
  const query = 'SELECT * FROM promotion_image';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(result);
    }
  });
});

// promotion สำหรับดึงข้อมูล
app.get('/getpromotionDetail', (req, res) => {
  const query = 'SELECT * FROM promotion_detail';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(result);
    }
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
app.get('/getproconsport', (req, res) => {
  const query = 'SELECT * FROM pro_consport';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching data');
    } else {
      res.json(result);
    }
  });
});

// API สำหรับดึงข้อมูลจากฐานข้อมูล
app.get('/getConcertstage', (req, res) => {
  const query = 'SELECT * FROM concert_stage'; // ตัวอย่าง query เพื่อดึงข้อมูล
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
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
app.put('/updateConcert/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, available_seats, type } = req.body;
  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `
    UPDATE concerts SET name = ?, date = ?, location = ?, price = ?, available_seats = ?, type = ?
    WHERE id = ?
  `;
  db.query(query, [name, date, location, price, available_seats, type, id], (err, result) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Concert not found.' });
    }
    res.status(200).json({ message: 'Concert updated successfully' });
  });
});

// Delete Concert
app.delete('/deleteConcert/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM concerts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Concert not found.' });
    }
    res.status(200).json({ message: 'Concert deleted successfully' });
  });
});


app.get('/getSportstage', (req, res) => {
  const query = 'SELECT * FROM sport_stage'; // ตัวอย่าง query เพื่อดึงข้อมูล
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});
// Add sport
app.post('/addSport', async (req, res) => {
  const { name, date, location, price, available_seats, type } = req.body;

  // Validate input
  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const sql = `INSERT INTO sports (name, date, location, price, available_seats, type) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, date, location, price, available_seats, type];
    
    // Using promise-based query
    const [result] = await db.query(sql, values);  // This ensures it returns a promise.
    
    res.status(201).json({ message: 'Sport added successfully', id: result.insertId });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update sport
app.put('/updateSport/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, available_seats, type } = req.body;

  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `
    UPDATE sports SET name = ?, date = ?, location = ?, price = ?, available_seats = ?, type = ?
    WHERE id = ?
  `;
  db.query(query, [name, date, location, price, available_seats, type, id], (err, result) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sport not found.' });
    }
    res.status(200).json({ message: 'Sport updated successfully' });
  });
});

// Delete sport
app.delete('/deleteSport/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM sports WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting sport:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    res.status(200).json({ message: 'Sport deleted successfully' });
  });
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
