import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import axios from 'axios';

interface UserData {
  id?: number;
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  address: string;
  gender: string;
  role: string;
  profile_image: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [formData, setFormData] = useState<UserData>({
    email: '',
    password: '',
    phone: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    address: '',
    gender: '',
    role: '',
    profile_image: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllUsers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleAddOrUpdate = async () => {
    try {
      const url = isEditing
        ? `http://localhost:5000/updateUser/${formData.id}`
        : 'http://localhost:5000/addUser';
      const method = isEditing ? axios.put : axios.post;
      const response = await method(url, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (isEditing) {
        setUsers((prev) => prev.map((user) => (user.id === formData.id ? response.data : user)));
      } else {
        setUsers((prev) => [...prev, response.data]);
      }

      setFormData({ email: '', password: '', phone: '', first_name: '', last_name: '', birth_date: '', address: '', gender: '', role: '', profile_image: '' });
      setIsEditing(false);
      setOpen(false);
    } catch (error) {
      console.error('Error adding/updating user:', error);
    }
  };

  const handleEdit = (user: UserData) => {
    setFormData(user);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deleteUser/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) {
    return <Typography>Loading users...</Typography>;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <Box>
      <Typography variant="h4" textAlign="center" mt={4} mb={4}>
        Users Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 4 }}>
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white' }}>First Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Last Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Birth Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              <TableCell sx={{ color: 'white' }}>Gender</TableCell>
              <TableCell sx={{ color: 'white' }}>Role</TableCell>
              <TableCell sx={{ color: 'white' }}>Profile Image</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{formatDate(user.birth_date)}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <img src={user.profile_image} alt="Profile" width="50" height="50" />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small" onClick={() => user.id && handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: 600 }}>
          <Typography variant="h6" component="h2">
            {isEditing ? 'Edit User' : 'Add User'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Birth Date"
                name="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Profile Image URL"
                name="profile_image"
                value={formData.profile_image}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleAddOrUpdate} sx={{ mt: 2 }}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default Users;
