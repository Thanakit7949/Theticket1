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
  database: 'project',
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

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

// Login ผ่านเบอร์โทรศัพท์และส่ง JWT กลับ
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
      const token = jwt.sign({ id: user.id, phone: user.phone }, secretKey, { expiresIn: '1h' });

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

// ดึงข้อมูลผู้ใช้ตาม ID
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
    return res.status(500).json({ message: 'Internal server error' });
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

//spport
app.get("/getZoneSport", async (req, res) => {
  const { sport_id } = req.query;

  if (!sport_id) {
    return res.status(400).json({ error: "sport_id is required" });
  }

  try {
    const [results] = await db.query("SELECT * FROM sport_zone WHERE sport_id = ?", [sport_id]);
    res.json(results);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get('/api/seatSport/:zoneSpId', async (req, res) => {
  const { zoneSpId } = req.params;
  try {
    console.log('กำลังดึงข้อมูลที่นั่งสำหรับโซน:', zoneSpId);

    // แปลงค่าให้แน่ใจว่าเป็นตัวเลข
    const zoneSpIdNum = Number(zoneSpId);
    if (isNaN(zoneSpIdNum)) {
      return res.status(400).json({ error: "zoneSpId must be a valid number" });
    }

    // ใช้ .promise().query()
    // const [rows] = await db.promise().query('SELECT * FROM seats WHERE zone_id = ?', [zoneIdNum]);
    const [rows] = await db.query('SELECT * FROM sport_seats WHERE zoneSp_id  = ?', [zoneSpId]);
    console.log('ข้อมูลที่นั่ง:', rows);

    if (!rows || rows.length === 0) {
      console.log(`ไม่พบที่นั่งสำหรับ zoneId: ${zoneSpId}`);
      return res.status(404).send('ไม่พบที่นั่ง');
    }

    res.json(rows);
  } catch (error) {
    console.error("ข้อผิดพลาดฐานข้อมูล:", error);
    res.status(500).send('เกิดข้อผิดพลาดของเซิร์ฟเวอร์');
  }
});

// API เพื่ออัปเดตสถานะที่นั่ง (Backend)
app.post('/api/update-seatSport', async (req, res) => {
  const { seatNumber, status } = req.body; // รับ seatNumber แทน seatId
  try {
    if (!seatNumber || status === undefined) {
      return res.status(400).json({ error: "seatNumber and status are required" });
    }

    console.log("Updating seat:", { seatNumber, status });

    const query = 'UPDATE sport_seats SET is_reserved = ? WHERE seat_number = ?';

    // ใช้ .promise().execute()
    // await db.promise().execute(query, [status, seatNumber]);
    await db.execute(query, [status, seatNumber]);


    res.status(200).send('Seat updated successfully');
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send('Server Error');
  }
});


app.post('/api/book-seatSport', async (req, res) => {
  const { userId, sportId, zoneId, selectedSeats,total_price } = req.body;
console.log(userId)
console.log(sportId)
console.log(zoneId)
console.log(selectedSeats)
  // 1. สร้าง booking entry ใน sportbooking_user
  const bookingTime = new Date();
  try {
    // 2. Insert ข้อมูลการจองเข้าไปใน sportbooking_user
    const [bookingResult] = await db.execute(
      `INSERT INTO sportbooking_user (user_id, sport_id, zoneSp_id, booking_time,	total_price) VALUES (?, ?, ?, ?, ?)`,
      [userId, sportId, zoneId, bookingTime,total_price]
    );
    const bookingId = bookingResult.insertId;

    // 3. ดึงข้อมูล seat_id จาก seat_number สำหรับแต่ละที่นั่ง
    for (const seat of selectedSeats) {
      const [seatResult] = await db.execute(
        `SELECT id FROM sport_seats WHERE seat_number = ? AND zoneSp_id = ?`,
        [seat, zoneId]
      );

      if (seatResult.length > 0) {
        const seatId = seatResult[0].id;

        // 4. Insert ข้อมูลที่นั่งที่ถูกจองเข้าไปใน seat_bookings
        await db.execute(
          `INSERT INTO seatsport_bookings (booking_id, seat_id) VALUES (?, ?)`,
          [bookingId, seatId]
        );
      } else {
        console.log(`ไม่พบที่นั่ง ${seat} ในโซน ${zoneId}`);
      }
    }

    res.status(200).send('จองที่นั่งสำเร็จ');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการจองที่นั่ง:', error);
    res.status(500).send('เกิดข้อผิดพลาดในการจองที่นั่ง');
  }
});

app.get('/api/bookingSport-details', async (req, res) => {
  const { user_id, sport_id } = req.query;

  try {
    const query = `
      SELECT 
        u.first_name AS user_name, 
        c.name AS sport_name, 
        c.location AS sport_location, 
        c.image AS sport_img, 
        c.date AS sport_date, 
        c.time AS sport_time, 
        z.name AS zone_name, 
        z.seat_count AS total_seats, 
        s.seat_number,
        bu.total_price AS price
      FROM 
        sportbooking_user bu
      JOIN 
        users u ON bu.user_id = u.id
      JOIN 
        sports c ON bu.sport_id = c.id
      JOIN 
        sport_zone z ON bu.zoneSp_id = z.id
      JOIN 
        seatsport_bookings sb ON bu.booking_id = sb.booking_id
      JOIN 
        sport_seats s ON sb.seat_id = s.id
      WHERE 
        bu.user_id = ? AND bu.sport_id = ?
    `;

    const [rows] = await db.execute(query, [user_id, sport_id]);

    if (rows.length === 0) {
      res.status(404).send("ไม่พบข้อมูลการจอง");
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการจอง:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});




//concert
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

// ดึงข้อมูล Concerts
app.get("/getZones", async (req, res) => {
  try {
    const { concert_id } = req.query;
    console.log("Received concert_id:", concert_id);

    // แปลงค่าให้เป็นตัวเลข (ถ้าจำเป็น)
    const concertIdNum = Number(concert_id);
    if (isNaN(concertIdNum)) {
      return res.status(400).json({ error: "concert_id must be a valid number" });
    }

    // ใช้ await query ข้อมูลจากฐานข้อมูล
    const [results] = await db.query("SELECT * FROM zones WHERE concert_id = ?", [concertIdNum]);

    console.log("Query Results:", results);
    res.json(results);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});


// API ดึงข้อมูลที่นั่งสำหรับโซน
app.get('/api/seats/:zoneId', async (req, res) => {
  const { zoneId } = req.params;
  try {
    console.log('กำลังดึงข้อมูลที่นั่งสำหรับโซน:', zoneId);

    // แปลงค่าให้แน่ใจว่าเป็นตัวเลข
    const zoneIdNum = Number(zoneId);
    if (isNaN(zoneIdNum)) {
      return res.status(400).json({ error: "zoneId must be a valid number" });
    }

    // ใช้ .promise().query()
    // const [rows] = await db.promise().query('SELECT * FROM seats WHERE zone_id = ?', [zoneIdNum]);
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
    if (!seatNumber || status === undefined) {
      return res.status(400).json({ error: "seatNumber and status are required" });
    }

    console.log("Updating seat:", { seatNumber, status });

    const query = 'UPDATE seats SET is_reserved = ? WHERE seat_number = ?';

    // ใช้ .promise().execute()
    // await db.promise().execute(query, [status, seatNumber]);
    await db.execute(query, [status, seatNumber]);


    res.status(200).send('Seat updated successfully');
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send('Server Error');
  }
});


app.post('/api/book-seats', async (req, res) => {
  const { userId, concertId, zoneId, selectedSeats,total_price } = req.body;
console.log(userId)
console.log(concertId)
console.log(zoneId)
console.log(selectedSeats)
  // 1. สร้าง booking entry ใน bookings_user
  const bookingTime = new Date();
  try {
    // 2. Insert ข้อมูลการจองเข้าไปใน bookings_user
    const [bookingResult] = await db.execute(
      `INSERT INTO bookings_user (user_id, concert_id, zone_id, booking_time,total_price) VALUES (?, ?, ?, ?, ?)`,
      [userId, concertId, zoneId, bookingTime,total_price]
    );
    const bookingId = bookingResult.insertId;

    // 3. ดึงข้อมูล seat_id จาก seat_number สำหรับแต่ละที่นั่ง
    for (const seat of selectedSeats) {
      const [seatResult] = await db.execute(
        `SELECT id FROM seats WHERE seat_number = ? AND zone_id = ?`,
        [seat, zoneId]
      );

      if (seatResult.length > 0) {
        const seatId = seatResult[0].id;

        // 4. Insert ข้อมูลที่นั่งที่ถูกจองเข้าไปใน seat_bookings
        await db.execute(
          `INSERT INTO seat_bookings (booking_id, seat_id) VALUES (?, ?)`,
          [bookingId, seatId]
        );
      } else {
        console.log(`ไม่พบที่นั่ง ${seat} ในโซน ${zoneId}`);
      }
    }

    res.status(200).send('จองที่นั่งสำเร็จ');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการจองที่นั่ง:', error);
    res.status(500).send('เกิดข้อผิดพลาดในการจองที่นั่ง');
  }
});

app.get('/api/booking-details', async (req, res) => {
  const { user_id, concert_id } = req.query;

  try {
    const query = `
      SELECT 
        u.first_name AS user_name, 
        c.name AS concert_name, 
        c.location AS concert_location, 
        c.image AS concert_img, 
        c.date AS concert_date, 
        c.time AS concert_time, 
        z.name AS zone_name, 
        z.seat_count AS total_seats, 
        s.seat_number,
        bu.total_price AS price
      FROM 
        bookings_user bu
      JOIN 
        users u ON bu.user_id = u.id
      JOIN 
        concerts c ON bu.concert_id = c.id
      JOIN 
        zones z ON bu.zone_id = z.id
      JOIN 
        seat_bookings sb ON bu.booking_id = sb.booking_id
      JOIN 
        seats s ON sb.seat_id = s.id
      WHERE 
        bu.user_id = ? AND bu.concert_id = ?
    `;

    const [rows] = await db.execute(query, [user_id, concert_id]);

    if (rows.length === 0) {
      res.status(404).send("ไม่พบข้อมูลการจอง");
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการจอง:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});



app.get('/getAllConcerts', async (req, res) => {
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
  console.log("type",type)
  try {
    let query = 'SELECT * FROM concerts';
    const params = [];
    if (type !== 'ALL') {
      query += ' WHERE type = ?';
      params.push(type);
    }
    const [rows] = await db.query(query, params);
    console.log("rows: ",[rows]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concerts by type:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllConcertsthaiMass', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM concerts WHERE type = "thaimass"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concerts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/getAllConcertstpop', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM concerts WHERE type = "tpop"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concerts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/getAllConcertskpop', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM concerts WHERE type = "kpop"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concerts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/getAllConcertsinter', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM concerts WHERE type = "inter"');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching concerts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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

app.get('/getpromotionImage', async (req, res) => {
  const query = 'SELECT image FROM promotion_image';
  try {
    // ใช้ await เพื่อให้ดึงข้อมูลแบบ promise
    const [result] = await db.query(query);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});


// promotion สำหรับดึงข้อมูล
// app.get('/getpromotionDetail', async (req, res) => {
//   const query = 'SELECT * FROM promotion_detail';
//   db.query(query, (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error fetching data', error: err.message });
//     }
//     return res.json(result);
//   });
// });

app.get('/getpromotionDetail', async (req, res) => {
  const query = 'SELECT * FROM promotion_detail';
  try {
    const [result] = await db.query(query);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

// promotion สำหรับดึงข้อมูล
app.get('/getproconsport', async (req, res) => {
  const query = 'SELECT * FROM pro_consport';
  try {
    const [result] = await db.query(query);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
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
  } catch (error) {
    console.error('Database Error:', error.message);
    res.status(500).json({ message: 'Database error' });
  }
});

// Delete zones by concert ID
app.delete('/deleteZonesByConcert/:concertId', async (req, res) => {
  const { concertId } = req.params;

  try {
    // First, delete dependent rows in bookings_user
    await db.query('DELETE FROM bookings_user WHERE zone_id IN (SELECT id FROM zones WHERE concert_id = ?)', [concertId]);

    // Then, delete the zones
    const query = 'DELETE FROM zones WHERE concert_id = ?';
    const [result] = await db.query(query, [concertId]);
    if (result.affectedRows === 0) {
      return res.status(200).json({ message: 'No zones found for this concert.' });
    }
    res.status(200).json({ message: 'Zones deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
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
  const { name, date, location, price, available_seats, type } = req.body;

  // Validate input
  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    const [result] = await db.query('INSERT INTO sports (name, date, location, price, available_seats, type) VALUES (?, ?, ?, ?, ?, ?)', [name, formattedDate, location, price, available_seats, type]);
    return res.status(201).json({ id: result.insertId, message: 'Sport added successfully' });
  } catch (error) {
    console.error('Error adding sport:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Update sport
app.put('/updateSport/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, location, price, available_seats, type } = req.body;

  // Validate input
  if (!name || !date || !location || price == null || available_seats == null || !type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    const [result] = await db.query('UPDATE sports SET name = ?, date = ?, location = ?, price = ?, available_seats = ?, type = ? WHERE id = ?', [name, formattedDate, location, price, available_seats, type, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.status(200).json({ message: 'Sport updated successfully' });
  } catch (error) {
    console.error('Error updating sport:', error);
    return res.status(500).json({ message: 'Internal server error' });
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

// Delete zones by sport ID
app.delete('/deleteZonesBySport/:sportId', async (req, res) => {
  const { sportId } = req.params;

  try {
    // First, delete dependent rows in seatsport_bookings
    await db.query('DELETE FROM seatsport_bookings WHERE booking_id IN (SELECT booking_id FROM sportbooking_user WHERE zoneSp_id IN (SELECT id FROM sport_zone WHERE sport_id = ?))', [sportId]);

    // Then, delete dependent rows in sportbooking_user
    await db.query('DELETE FROM sportbooking_user WHERE zoneSp_id IN (SELECT id FROM sport_zone WHERE sport_id = ?)', [sportId]);

    // Next, delete dependent rows in sport_seats
    await db.query('DELETE FROM sport_seats WHERE zoneSp_id IN (SELECT id FROM sport_zone WHERE sport_id = ?)', [sportId]);

    // Finally, delete the zones
    const query = 'DELETE FROM sport_zone WHERE sport_id = ?';
    const [result] = await db.query(query, [sportId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Zones not found' });
    }
    res.status(200).json({ message: 'Zones deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Fetch all users
app.get('/getAllUsers', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, email, password, phone, first_name, last_name, birth_date, address, gender, role, created_at, profile_image FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add User
app.post('/addUser', async (req, res) => {
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
app.put('/updateUser/:id', async (req, res) => {
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
app.delete('/deleteUser/:id', async (req, res) => {
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
app.get('/getAllOrders', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add Order
app.post('/addOrder', async (req, res) => {
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
app.put('/updateOrder/:id', async (req, res) => {
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
app.delete('/deleteOrder/:id', async (req, res) => {
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

app.post('/addProduct', async (req, res) => {
  const { name, price, category, description, image } = req.body;
  const { table } = req.query;

  if (!name || !price || !category || !description || !image || !table) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const validTables = ['flashsalepro', 'flashsalesport', 'product', 'scarfsport', 'shoesport', 'shirtsport', 'shirtcon', 'shirtconpro'];
  if (!validTables.includes(table)) {
    return res.status(400).json({ message: 'Invalid table name' });
  }

  try {
    const query = `INSERT INTO ${table} (name, price, category, description, image) VALUES (?, ?, ?, ?, ?)`;
    await db.query(query, [name, price, category, description, image]);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.put('/updateProduct/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description, image, table } = req.body;

  if (!name || !price || !category || !description || !image || !table) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const validTables = ['flashsalepro', 'flashsalesport', 'product', 'scarfsport', 'shoesport', 'shirtsport', 'shirtcon', 'shirtconpro'];
  if (!validTables.includes(table)) {
    return res.status(400).json({ message: 'Invalid table name' });
  }

  try {
    const query = `UPDATE ${table} SET name = ?, price = ?, category = ?, description = ?, image = ? WHERE id = ?`;
    const [result] = await db.query(query, [name, price, category, description, image, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.delete('/deleteProduct/:id', async (req, res) => {
  const { id } = req.params;
  const { table } = req.query;

  if (!table) {
    return res.status(400).json({ message: 'Table name is required' });
  }

  const validTables = ['flashsalepro', 'flashsalesport', 'product', 'scarfsport', 'shoesport', 'shirtsport', 'shirtcon', 'shirtconpro'];
  if (!validTables.includes(table)) {
    return res.status(400).json({ message: 'Invalid table name' });
  }

  try {
    const query = `DELETE FROM ${table} WHERE id = ?`;
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.post('/addZone', async (req, res) => {
  const { concert_id, sport_id, name, seat_count } = req.body;

  if ((!concert_id && !sport_id) || !name || seat_count == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO zones (concert_id, name, seat_count) VALUES (?, ?, ?)' // For concert
    const [result] = await db.query(query, [concert_id, name, seat_count]);
    res.status(201).json({ id: result.insertId, message: 'Zone added successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.post('/addSeat', async (req, res) => {
  const { zone_id, seat_number } = req.body;

  if (!zone_id || !seat_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO seats (zone_id, seat_number) VALUES (?, ?)';
    await db.query(query, [zone_id, seat_number]);
    res.status(201).json({ message: 'Seat added successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.get('/getAllUsers', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM users');
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Update zones by concert ID
app.put('/updateZonesByConcert/:concertId', async (req, res) => {
  const { concertId } = req.params;
  const { name, seat_count } = req.body;

  if (!name || seat_count == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'UPDATE zones SET name = ?, seat_count = ? WHERE concert_id = ?';
    const [result] = await db.query(query, [name, seat_count, concertId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Zones not found' });
    }
    res.status(200).json({ message: 'Zones updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Update seats by zone ID
app.put('/updateSeatsByZone/:zoneId', async (req, res) => {
  const { zoneId } = req.params;
  const { seat_number, is_reserved } = req.body;

  if (!seat_number || is_reserved == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'UPDATE seats SET seat_number = ?, is_reserved = ? WHERE zone_id = ?';
    const [result] = await db.query(query, [seat_number, is_reserved, zoneId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Seats not found' });
    }
    res.status(200).json({ message: 'Seats updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// API สำหรับดึงข้อมูลการจอง
app.get('/getAllBookings', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings_user');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API สำหรับอัปเดตสถานะการจอง
app.put('/updateBookingStatus/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const [result] = await db.query('UPDATE bookings_user SET status = ? WHERE booking_id = ?', [status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    res.status(200).json({ message: 'Booking status updated successfully' });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch data from flashsalepro
app.get('/getAllFlashsalePro', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flashsalepro');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching flashsalepro:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch data from flashsalesport
app.get('/getAllFlashsaleSport', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flashsalesport');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching flashsalesport:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch data from product
app.get('/getAllProduct', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM product');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch data from scarfsport
app.get('/getAllScarfSport', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM scarfsport');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching scarfsport:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch data from shoesport
app.get('/getAllShoeSport', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM shoesport');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching shoesport:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch data from shirtsport
app.get('/getAllShirtSport', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM shirtsport');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching shirtsport:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch data from shirtcon
app.get('/getAllShirtCon', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM shirtcon');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching shirtcon:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch data from shirtconpro
app.get('/getAllShirtConPro', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM shirtconpro');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching shirtconpro:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add Product
app.post('/addProduct', async (req, res) => {
  const { name, price, category, description, image } = req.body;

  if (!name || !price || !category || !description || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO product (name, price, category, description, image) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [name, price, category, description, image]);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Update Product
app.put('/updateProduct/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description, image } = req.body;

  if (!name || !price || !category || !description || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'UPDATE product SET name = ?, price = ?, category = ?, description = ?, image = ? WHERE id = ?';
    const [result] = await db.query(query, [name, price, category, description, image, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Delete Product
app.delete('/deleteProduct/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM product WHERE id = ?';
    const [result] = await db.query(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Update Product Status
app.put('/updateProductStatus/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const query = 'UPDATE product SET status = ? WHERE id = ?';
    const [result] = await db.query(query, [status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product status updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Add Zone for Sports
app.post('/addSportZone', async (req, res) => {
  const { sport_id, name, seat_count } = req.body;

  if (!sport_id || !name || seat_count == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO sport_zone (sport_id, name, seat_count) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [sport_id, name, seat_count]);
    res.status(201).json({ id: result.insertId, message: 'Zone added successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Add Seat for Sports
app.post('/addSportSeat', async (req, res) => {
  const { zone_id, seat_number } = req.body;

  if (!zone_id || !seat_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO sport_seats (zoneSp_id, seat_number) VALUES (?, ?)';
    await db.query(query, [zone_id, seat_number]);
    res.status(201).json({ message: 'Seat added successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Update zones by concert ID
app.put('/updateZonesBySport/:sportId', async (req, res) => {
  const { sportId } = req.params;
  const { name, seat_count } = req.body;

  if (!name || seat_count == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'UPDATE sport_zone SET name = ?, seat_count = ? WHERE sport_id = ?';
    const [result] = await db.query(query, [name, seat_count, sportId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Zones not found' });
    }
    res.status(200).json({ message: 'Zones updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

// Update seats by zone ID
app.put('/updateSeatsByZone/:zoneId', async (req, res) => {
  const { zoneId } = req.params;
  const { seat_number, is_reserved } = req.body;

  if (!seat_number || is_reserved == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const query = 'UPDATE seats SET seat_number = ?, is_reserved = ? WHERE zone_id = ?';
    const [result] = await db.query(query, [seat_number, is_reserved, zoneId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Seats not found' });
    }
    res.status(200).json({ message: 'Seats updated successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});