const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
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



app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log("Received Email:", email);
  console.log("Received Password:", password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    // console.log(result)
    if (result.length > 0) {
      const { password, ...userData } = result[0]; // ลบ password ออกจากข้อมูลผู้ใช้
      return res.json({ ...userData, role: userData.role });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

app.post('/login-phone', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
    if (rows.length > 0) {
      const user = rows[0];
      const { password, ...userData } = user;
      return res.json({ user: userData });
    } else {
      return res.status(401).json({ message: 'Invalid phone number' });
    }
  } catch (error) {
    console.error('Error during phone login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await db.getUserById(userId); // Fetch user from the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/register', (req, res) => {
  const { email, password, phone, firstName, lastName, birthdate, gender } = req.body;

  // ตรวจสอบว่าฟิลด์ทั้งหมดไม่เป็นค่าว่าง
  if (!email || !password || !phone || !firstName || !lastName || !birthdate || !gender) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // ตรวจสอบอีเมลซ้ำและบันทึกข้อมูล
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    if (result.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const query = 'INSERT INTO users (email, password, phone, first_name, last_name, birth_date, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [email, password, phone, firstName, lastName, birthdate, gender], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
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

app.get('/getAllSports', (req, res) => {
  const query = 'SELECT * FROM sports'; // ดึงข้อมูลทั้งหมดจาก concerts
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
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








app.get('/getInformationbook', (req, res) => {
  const query = 'SELECT * FROM informationbook'; // ดึงข้อมูลทั้งหมดจาก product
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
app.post('/addConcert', (req, res) => {
  const { name, date, location, price, available_seats } = req.body;
  if (!name || !date || !location || price == null || available_seats == null) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const query = `
    INSERT INTO concerts (name, date, location, price, available_seats)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [name, date, location, price, available_seats], (err) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Concert added successfully' });
  });
});

// Update Concert
app.put('/updateConcert/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, available_seats } = req.body;
  if (!name || !date || !location || price == null || available_seats == null) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `
    UPDATE concerts SET name = ?, date = ?, location = ?, price = ?, available_seats = ?
    WHERE id = ?
  `;
  db.query(query, [name, date, location, price, available_seats, id], (err, result) => {
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
  const { name, date, location, price, availableSeats } = req.body;

  // Validate input
  if (!name || !date || !location || !price || !availableSeats) {
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
app.put('/updateSport/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, availableSeats } = req.body;

  const query =
    'UPDATE sports SET sport_name = ?, date = ?, location = ?, price = ?, available_seats = ? WHERE id = ?';
  db.query(query, [sportName, date, location, price, availableSeats, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});