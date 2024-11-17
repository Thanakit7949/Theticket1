import React, { useState, useEffect, ChangeEvent } from 'react';
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
} from '@mui/material';

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

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (savedUser && savedUser.id) {
      fetchUserProfile(savedUser.id);
    } else {
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

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', JSON.parse(localStorage.getItem('user') || '{}').id);

      axios
        .post('http://localhost:3001/uploads', formData)
        .then((response) => {
          setImage(response.data.imageUrl);
          setProfile((prevProfile) => ({
            ...prevProfile,
            profile_image: response.data.imageUrl,
          }));
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };

  const handleUpdate = () => {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!savedUser || !savedUser.id) {
      alert('User ID is undefined');
      return;
    }
    axios
      .put(
        `http://localhost:3001/users/${savedUser.id}`,
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

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Box textAlign="center" mt={5} mb={3}>
        <Typography variant="h4" fontWeight="bold">
          User Profile
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your profile details and update your information.
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
            <Button variant="contained" component="label">
              Upload Picture
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={profile.first_name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={profile.last_name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Birth Date"
              type="date"
              name="birth_date"
              value={profile.birth_date}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
              margin="normal"
              select
              SelectProps={{ native: true }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </TextField>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Profile
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
