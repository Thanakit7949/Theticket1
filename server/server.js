const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
<<<<<<<<< Temporary merge branch 1
  database: 'ticket_db',
=========
  database: 'testtwo',
>>>>>>>>> Temporary merge branch 2
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // ตรวจสอบว่ามี email ซ้ำหรือไม่
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    if (result.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // เพิ่มผู้ใช้ใหม่หากไม่มี email ซ้ำ
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
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
  
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});