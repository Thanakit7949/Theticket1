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

const Profiles: React.FC = () => {
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
  const [logoutDialog, setLogoutDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || !user.id) {
      navigate('/login'); // Redirect ถ้าไม่ได้ล็อกอิน
    } else {
      fetchUserProfile(user.id);
    }
  }, []);

  const fetchUserProfile = async (userId: number) => {
    try {
      const res = await axios.get<UserProfile>(`http://localhost:5000/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const userData = res.data;
      setProfile({
        ...userData,
        gender: userData.gender.toLowerCase(), // แปลงเป็น lower case เพื่อให้แสดงในฟอร์มได้ถูกต้อง
      });
      setImage(userData.profile_image || null);
    } catch (err) {
      alert('Failed to fetch profile.');
      navigate('/login'); // Redirect เมื่อมีปัญหา
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      await axios.put(
        `http://localhost:5000/users/${user.id}`,
        {
          ...profile,
          gender: profile.gender.toLowerCase(), // แปลงกลับเป็นค่าที่ Backend รองรับ
          profile_image: image,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Profile updated successfully!');
    } catch {
      alert('Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
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
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={image || '/default-profile.png'}
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
              value={profile.first_name}
              onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              value={profile.last_name}
              onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Birth Date"
              type="date"
              value={profile.birth_date ? new Date(profile.birth_date).toISOString().split('T')[0] : ''}
              onChange={(e) => setProfile({ ...profile, birth_date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Gender"
              value={
                profile.gender.toLowerCase() === 'male'
                  ? 'Male'
                  : profile.gender.toLowerCase() === 'female'
                    ? 'Female'
                    : 'Other'
              }
              onChange={(e) =>
                setProfile({ ...profile, gender: e.target.value.toLowerCase() })
              }
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
        </Grid>
      </Grid>
      <Box textAlign="center" mt={3}>
        <Button variant="outlined" color="error" onClick={() => setLogoutDialog(true)}>
          Logout
        </Button>
      </Box>
      <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setLogoutDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profiles;
