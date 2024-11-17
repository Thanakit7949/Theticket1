import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState(''); // Error message for password mismatch
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError(''); // Clear error if passwords match

    try {
      const response = await axios.post('http://localhost:5000/register', {
        email,
        password,
        phone,
        firstName,
        lastName,
        birthdate,
        gender,
      });
      console.log("Registration Successful:", response.data);
      setMessage("Registration successful!");
      navigate('/login');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Registration failed:", axiosError.response?.data || axiosError.message);
      setMessage("Registration failed");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
        
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            fullWidth
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
            fullWidth
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            fullWidth
            error={!!passwordError} // Show error state if passwordError exists
            helperText={passwordError} // Display password error message below field
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <TextField
            label="Birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Gender"
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            margin="normal"
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Box>
        
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Register
        </Button>
      </form>
      {message && <Typography variant="body1" color="error">{message}</Typography>}
    </Box>
  );
};

export default RegisterPage;
