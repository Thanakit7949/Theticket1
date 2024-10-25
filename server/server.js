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
  
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }
  
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    
    db.query(query, [email, password], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
  
      if (result.length > 0) {
        const { password, ...userData } = result[0]; // ลบ password ออกจากข้อมูลผู้ใช้
        return res.json(userData);
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    });
  });
  
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
