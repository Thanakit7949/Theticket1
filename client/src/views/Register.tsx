import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        email,
        password
      });
      console.log("Registration Successful:", response.data);
      setMessage("Registration successful!"); // แสดงข้อความสำเร็จ
      navigate('/login'); // นำทางไปหน้า login หลังจากสมัครสำเร็จ
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Registration failed:", axiosError.response?.data || axiosError.message);
        setMessage("Registration failed");
      }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
          Register
        </Button>
      </form>
      {message && <Typography variant="body1" color="error">{message}</Typography>}
    </Box>
  );
};

export default RegisterPage;
