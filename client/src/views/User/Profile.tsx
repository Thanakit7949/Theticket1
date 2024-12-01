import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length > 0) {
      const user = users[users.length - 1];
      fetchUserProfile(user.id);
    } else {
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

  const fetchUserProfile = async (userId: number) => {
    try {
      const res = await axios.get<UserProfile>(`http://localhost:3001/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const userData = res.data;
      if (userData.birth_date) {
        userData.birth_date = formatDate(userData.birth_date);
      }
      setProfile(userData);
      setImage(userData.profile_image || null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      alert('You must log in first!');
      return;
    }
    const user = users[users.length - 1];

    try {
      await axios.put(
        `http://localhost:3001/users/${user.id}`,
        { ...profile, profile_image: image },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    setLogoutDialog(false);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.pop();
    localStorage.setItem('users', JSON.stringify(users));
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
    navigate('/login');
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Box textAlign="center" mt={5} mb={3}>
        <Typography variant="h4" fontWeight="bold">
          User Profile
        </Typography>
      </Box>
      {error && (
        <Typography color="error" textAlign="center" mb={3}>
          {error}
        </Typography>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={image || '/path/to/default-profile-pic'}
              alt="Profile Picture"
              sx={{ width: 150, height: 150, mb: 2 }}
            />
            <Button variant="contained" component="label">
              Change Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Button>
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
              select
              label="Gender"
              name="gender"
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              margin="normal"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? <CircularProgress size={24} /> : 'Update Profile'}
            </Button>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => setLogoutDialog(true)}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
      <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setLogoutDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
