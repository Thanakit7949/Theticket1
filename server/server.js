const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '192.168.1.35',
  user: 'root',
  password: '',
  database: 'concert',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    const query = 'SELECT emp_id, username, password, full_name, role FROM admin WHERE username = ? AND password = ?';
    
    db.query(query, [username, password], (err, result) => {
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
