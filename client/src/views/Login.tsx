import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // ใช้ useNavigate แทน useHistory
import { TextField, Button, Typography, Box } from '@mui/material';

export interface ILoginPagePageProps {}

const LoginPage: React.FunctionComponent<ILoginPagePageProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // ใช้ navigate เพื่อเปลี่ยนเส้นทาง

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // ป้องกันการรีเฟรชหน้า

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      const data = response.data;
console.log(data)
      if (data.role === 'admin') {
        // ถ้า role เป็น 1 ให้ไปหน้า admin
        navigate('/home-admin');
      } else if (data.role === 'user') {
        // ถ้า role เป็น 0 ให้ไปหน้า user
        navigate('/home-user');
      } else {
        setMessage('Unknown role');
      }
    } catch (error) {
      console.error(error);
      setMessage('Login failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Login
        </Button>
      </form>
      {message && <Typography variant="body1" color="error">{message}</Typography>}
    </Box>
  );
};

export default LoginPage;
