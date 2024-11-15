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
  database: 'ticket_db',
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

app.get('/api/concerts', (req, res) => {
  db.query('SELECT * FROM concerts', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/concerts', (req, res) => {
  const { name, date, location } = req.body;
  db.query('INSERT INTO concerts (name, date, location) VALUES (?, ?, ?)', [name, date, location], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Concert added successfully' });
  });
});

app.put('/api/concerts/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, location } = req.body;
  db.query('UPDATE concerts SET name = ?, date = ?, location = ? WHERE id = ?', [name, date, location, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Concert updated successfully' });
  });
});

app.delete('/api/concerts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM concerts WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Concert deleted successfully' });
  });
});

  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});