import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';

const LoginPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
  
      const data = response.data;
  
      // Save user info in localStorage as an array
      const userData = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
      };
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
  
      // Save token as usual
      localStorage.setItem('token', data.token);
  
      // Redirect based on role
      if (data.role === 'admin') {
        navigate('/home-admin');
      } else if (data.role === 'user') {
        navigate('/home-test');
      } else {
        setMessage('Unknown role');
      }
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <Typography variant="h4">Login</Typography>
      <form
        onSubmit={handleLogin}
        style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
      >
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginTop: '10px' }}
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </form>
      {message && (
        <Typography variant="body1" color="error">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoginPage;
