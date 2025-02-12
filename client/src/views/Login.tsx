import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper, Stack, Tabs, Tab } from '@mui/material';
import logo from "../assets/logo/pillars.png";
import Cookies from "js-cookie";

const LoginPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
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
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));

      localStorage.setItem("token", data.token);
      console.log(users);
      console.log(data);
      console.log( data.user);
      console.log( data.user.first_name);
      console.log( data.user.last_name);
      console.log( data.user.id);
      Cookies.set("token", data.token);
      Cookies.set("userid", data.user.id);
      Cookies.set("acountname", data.user.first_name);
      Cookies.set("lastname", data.user.last_name);
      Cookies.set("phone", data.user.phone);
      Cookies.set("email", data.user.email);
      if (data.role === "admin") {
        navigate("/home-admin");
      } else if (data.role === "user") {
        navigate("/home-test");
      } else {
        setMessage('Unknown role');
      }
      localStorage.setItem('user', JSON.stringify(data.user)); // เก็บข้อมูลผู้ใช้
      localStorage.setItem('token', data.token); // เก็บ Token

      navigate(data.user.role === "admin" ? "/home-admin" : "/home-test");
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
  };

  const handleFacebookLogin = () => {
    // Implement Facebook login logic here
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

        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Email" />
          <Tab label="Phone" />
        </Tabs>

        {tabIndex === 0 && (
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
            </Stack>
          </form>
        )}

        {tabIndex === 1 && (
          <form onSubmit={handleLogin}>
          {/* <form onSubmit={handlePhoneLogin}> */}
            <Stack spacing={3}>
              <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            </Stack>
          </form>
        )}

        <Stack spacing={2} mt={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleGoogleLogin}
            sx={{
              padding: '12px',
              fontWeight: 'bold',
              fontSize: '16px',
              backgroundColor: '#DB4437', // สีแดงของ Google
              '&:hover': {
                backgroundColor: '#C23321', // สีแดงเข้มขึ้นตอน hover
              },
              borderRadius: '10px',
            }}
          >
            Login with Google
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleFacebookLogin}
            sx={{
              padding: '12px',
              fontWeight: 'bold',
              fontSize: '16px',
              backgroundColor: '#4267B2', // สีฟ้าของ Facebook
              '&:hover': {
                backgroundColor: '#365899', // สีฟ้าเข้มขึ้นตอน hover
              },
              borderRadius: '10px',
            }}
          >
            Login with Facebook
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
