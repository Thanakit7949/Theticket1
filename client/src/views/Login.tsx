import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper, Stack } from '@mui/material';
import logo from '../assets/logo/pillars.png';

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

      localStorage.setItem('token', data.token);

      if (data.role === 'admin') {
        navigate('/home-admin');
      } else if (data.role === 'user') {
        navigate('/home-test');
      } else {
        setMessage('Unknown role');
      }
      localStorage.setItem('user', JSON.stringify(data.user)); // เก็บข้อมูลผู้ใช้
      localStorage.setItem('token', data.token); // เก็บ Token

      navigate(data.user.role === 'admin' ? '/home-admin' : '/home-test');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{
        maxWidth: '600px',
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#f0f8ff', // ใช้สีพื้นหลังฟ้าพาสเทล
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          background: 'linear-gradient(to right, rgb(181, 230, 255), rgb(206, 239, 206))', // โทนสีเขียวฟ้าพาสเทล
          textAlign: 'center',
          padding: '40px 20px',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: '120px',
            height: '120px',
            marginBottom: '15px',
          }}
        />
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '38px',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.4)',
            letterSpacing: '1.5px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Welcome to INTERGETHER
        </Typography>
      </Box>

      {/* Form Section */}
      <Box sx={{ padding: '40px' }}>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#333',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Please login to access your account
        </Typography>

        <form onSubmit={handleLogin}>
          <Stack spacing={3}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                padding: '12px',
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: '#50E3C2', // ใช้สีเขียวฟ้า
                '&:hover': {
                  backgroundColor: '#34B6A6', // ใช้สีเขียวฟ้าเข้มขึ้นตอน hover
                },
                borderRadius: '10px',
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                padding: '12px',
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#4A90E2',
                borderColor: '#4A90E2',
                '&:hover': {
                  backgroundColor: '#E3F2FD',
                },
                borderRadius: '10px',
              }}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Stack>
        </form>

        {/* Message Section */}
        {message && (
          <Typography
            variant="body2"
            color="error"
            sx={{
              marginTop: '20px',
              textAlign: 'center',
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default LoginPage;
