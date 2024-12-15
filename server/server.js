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

// ดึงข้อมูล Sports
app.get('/getAllSports', authenticate, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM sports');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sports:', error);
    res.status(500).json({ message: 'Internal server error' });
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
  const query = 'SELECT * FROM lightstickcon'; // ดึงข้อมูลทั้งหมดจาก product
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
  const query = 'SELECT image FROM promotion_image';
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

  try {
    await db.query('INSERT INTO concerts (name, date, location, price, available_seats) VALUES (?, ?, ?, ?, ?)', [name, date, location, price, available_seats]);
    return res.status(201).json({ message: 'Concert added successfully' });
  } catch (error) {
    console.error('Error adding concert:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
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
