const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Use promise-based version of MySQL2
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("Received Email:", email);
  console.log("Received Password:", password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
      const user = rows[0];
      const { password, ...userData } = user;
      return res.json({ ...userData, role: userData.role });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login-phone', async (req, res) => {
  const { phone } = req.body;

  console.log("Received Phone:", phone);

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);
    if (rows.length > 0) {
      const user = rows[0];
      const { password, ...userData } = user;
      return res.json(userData); // Send userData directly
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
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
    await db.query(query, [email, password, phone, firstName, lastName, birthdate, gender]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllConcerts', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM concerts');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get("/getZones", async (req, res) => {
  const { concert_id } = req.query;

  if (!concert_id) {
    return res.status(400).json({ error: "concert_id is required" });
  }

  try {
    const [results] = await db.query("SELECT * FROM zones WHERE concert_id = ?", [concert_id]);
    res.json(results);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/seats/:zoneId', async (req, res) => {
  const { zoneId } = req.params;
  try {
    console.log('กำลังดึงข้อมูลที่นั่งสำหรับโซน:', zoneId);

    const [rows] = await db.query('SELECT * FROM seats WHERE zone_id = ?', [zoneId]);
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
    await db.query(query, [status, seatNumber]); // ใช้ seatNumber แทน
    res.status(200).send('Seat updated successfully');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

app.get('/getAllConcertsthaiMass', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM conthaiMass');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllConcertstpop', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM contpop');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllConcertskpop', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM conkpop');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllConcertsinter', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM coninter');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/concertsImage', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM concert_image');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/concertsDetail', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM concert_detail');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllSports', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM sports');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllSportsBoxing', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM boxing');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllProduct', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM product');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

//ProductConcert
app.get('/getAllflashsale', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM flashsalepro');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllshirtcon', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM shirtconpro');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllligthstickcon', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM lightstickcon LIMIT 6');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllAlbumcon', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM albumcon');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// ProductSport
app.get('/getAllflashsaleSport', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM flashsalesport');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllshirtsport', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM shirtsport');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllscarfsport', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM scarfsport');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllshoesport', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM shoesport');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getInformationbook', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM informationbook');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAdditionalInformation', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM additionalinformation');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getEventPoster', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM eventposter');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllSportsFootball', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM football');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllSportsOther', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM other');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Route สำหรับดึงข้อมูลกีฬาและภาพ
app.get('/sportsImage', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM sport_images');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Error fetching data');
  }
});

//  สำหรับดึงข้อมูลรูปภาพของsport
app.get("/getImages", async (req, res) => {
  try {
    const [results] = await db.query("SELECT image FROM images");
    res.json(results);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Error fetching images");
  }
});

// product สำหรับดึงข้อมูลภาพ
app.get('/getproductImage', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM product_image');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// promotion สำหรับดึงข้อมูลภาพ
app.get('/getpromotionImage', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM promotion_image');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// promotion สำหรับดึงข้อมูล
app.get('/getpromotionDetail', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM promotion_detail');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// promotion สำหรับดึงข้อมูล
app.get('/getproconsport', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM pro_consport');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// API สำหรับดึงข้อมูลจากฐานข้อมูล
app.get('/getConcertstage', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM concert_stage');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add concert
app.post('/addConcert', async (req, res) => {
  const { name, date, location, price, available_seats } = req.body;
  if (!name || !date || !location || price == null || available_seats == null) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const query = 'INSERT INTO concerts (name, date, location, price, available_seats) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [name, date, location, price, available_seats]);
    res.status(201).json({ message: 'Concert added successfully' });
  } catch (error) {
    console.error('Database Error:', error.message);
    res.status(500).json({ message: 'Database error' });
  }
});

// Update Concert
app.put('/updateConcert/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, available_seats } = req.body;
  if (!name || !date || !location || price == null || available_seats == null) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const query = 'UPDATE concerts SET name = ?, date = ?, location = ?, price = ?, available_seats = ? WHERE id = ?';
    const [result] = await db.query(query, [name, date, location, price, available_seats, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Concert not found.' });
    }
    res.status(200).json({ message: 'Concert updated successfully' });
  } catch (error) {
    console.error('Database Error:', error.message);
    res.status(500).json({ message: 'Database error' });
  }
});

// Delete Concert
app.delete('/deleteConcert/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM concerts WHERE id = ?';
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Concert not found.' });
    }
    res.status(200).json({ message: 'Concert deleted successfully' });
  } catch (error) {
    console.error('Database Error:', error.message);
    res.status(500).json({ message: 'Database error' });
  }
});

app.get('/getSportstage', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM sport_stage');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
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
    await db.query(sql, values);  // This ensures it returns a promise.

    res.status(201).json({ message: 'Sport added successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update sport
app.put('/updateSport/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, availableSeats } = req.body;

  try {
    const query = 'UPDATE sports SET sport_name = ?, date = ?, location = ?, price = ?, available_seats = ? WHERE id = ?';
    await db.query(query, [name, date, location, price, availableSeats, id]);
    res.status(200).json({ message: 'Sport updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Delete sport
app.delete('/deleteSport/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM sports WHERE id = ?';
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.status(200).json({ message: 'Sport deleted successfully' });
  } catch (error) {
    console.error('Error deleting sport:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});