import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  gender: string;
  profile_image?: string | null;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birth_date: '',
    gender: '',
    profile_image: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the users array from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length > 0) {
      const user = users[users.length - 1]; // Get the last logged-in user
      fetchUserProfile(user.id);
    } else {
      // Reset profile if no user is logged in
      setProfile({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        birth_date: '',
        gender: '',
        profile_image: null,
      });
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = (userId: number) => {
    axios
      .get<UserProfile>(`http://localhost:3001/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        const userData = res.data;
        if (userData.birth_date) {
          userData.birth_date = formatDate(userData.birth_date);
        }
        setProfile(userData);
        setImage(userData.profile_image || null);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setIsLoading(false);
      });
  };

  const handleUpdate = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      alert('You must log in first!');
      return;
    }
    const user = users[users.length - 1]; // Get the last logged-in user

    axios
      .put(
        `http://localhost:3001/users/${user.id}`,
        { ...profile, profile_image: image },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      .then(() => {
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Update failed:', error);
      });
  };

  const handleLogout = () => {
    // Remove the last logged-in user from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.pop(); // Remove the last user from the array
    localStorage.setItem('users', JSON.stringify(users));

    // Remove token and reset profile
    localStorage.removeItem('token');
    setProfile({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      birth_date: '',
      gender: '',
      profile_image: null,
    });
    navigate('/login'); // Redirect to login page
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return <CircularProgress />; // Show loading spinner while fetching
  }

  return (
    <Container>
      <Box textAlign="center" mt={5} mb={3}>
        <Typography variant="h4" fontWeight="bold">
          User Profile
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={image || '/path/to/default-profile-pic'}
              alt="Profile Picture"
              sx={{ width: 150, height: 150, mb: 2 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={profile.first_name}
              onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={profile.last_name}
              onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Birth Date"
              name="birth_date"
              type="date"
              value={profile.birth_date}
              onChange={(e) => setProfile({ ...profile, birth_date: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => handleUpdate()}
            >
              Update Profile
            </Button>
          </Box>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
