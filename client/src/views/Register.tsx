import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { TextField, Button, Typography, MenuItem, Paper, Grid } from '@mui/material';
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
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError('');

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
    <Paper
      elevation={12}
      sx={{
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        background: 'linear-gradient(to right, rgb(181, 230, 255), rgb(206, 239, 206))', // ฟ้า-เขียวพาสเทล
        margin: 'auto',
        borderRadius: '12px',  // ให้มุมโค้งมน
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          marginBottom: '24px',
          fontWeight: '650',
          fontSize: '45px',
          lineHeight: '1.4',
          letterSpacing: '2px',
          background: 'linear-gradient(to right, #004D40, #26A69A)', // สีเขียวสด
          borderBottom: '3px solid #004D40',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: `3px 3px 6px rgba(0, 77, 64, 0.3), 0px 4px 12px rgba(0, 0, 0, 0.2)`,
          paddingBottom: '12px',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              fullWidth
              required
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px', // มุมโค้งมนของช่องกรอกข้อมูล
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              fullWidth
              required
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
              required
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              required
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              fullWidth
              required
              error={!!passwordError}
              helperText={passwordError}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Gender"
              select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              margin="normal"
              fullWidth
              required
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: '20px',
            backgroundColor: '#26A69A', // เขียวอ่อนสดใส
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 77, 64, 0.2), inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#004D40',
              transform: 'scale(1.05)',
              boxShadow: '0px 8px 16px rgba(0, 77, 64, 0.4)',
            },
          }}
        >
          Register
        </Button>
      </form>
      {message && (
        <Typography
          variant="body1"
          color="error"
          sx={{
            marginTop: '10px',
            textAlign: 'center',
            fontWeight: '500',
            color: '#FF4C4C', // สีแดงอ่อน
          }}
        >
          {message}
        </Typography>
      )}
    </Paper>
  );
};

export default RegisterPage;
