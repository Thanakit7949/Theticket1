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
  database: 'ticket_db',
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

app.get('/getAllSports', (req, res) => {
  const query = 'SELECT * FROM sports'; // ดึงข้อมูลทั้งหมดจาก concerts
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    return res.json(results); // ส่งผลลัพธ์เป็น JSON
  });
});

// Add concert
app.post('/addConcert', (req, res) => {
  const { name, description, date, location, price, availableSeats } = req.body;

  if (!name || !date || !location || price == null || availableSeats == null) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `
    INSERT INTO concerts (name, description, date, location, price, available_seats)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [name, description, date, location, price, availableSeats], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    res.status(201).json({ message: 'Concert added successfully', result });
  });
});

// Update concert
app.put('/updateConcert/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, date, location, price, availableSeats } = req.body;

  if (!concertName || !date || !location || price == null || availableSeats == null) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `
    UPDATE concerts
    SET name = ?, description = ?, date = ?, location = ?, price = ?, available_seats = ?
    WHERE id = ?
  `;
  db.query(query, [concertName, description, date, location, price, availableSeats, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Concert not found.' });
    }

    res.status(200).json({ message: 'Concert updated successfully', result });
  });
});
// Delete concert
app.delete('/deleteConcert/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM concerts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
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
