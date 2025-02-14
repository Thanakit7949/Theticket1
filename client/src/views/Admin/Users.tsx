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
      const response = await axios.get('http://localhost:5000/getAllUsers');
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
      const response = await method(url, formData);

      if (isEditing) {
        setUsers((prev) => prev.map((user) => (user.id === formData.id ? response.data : user)));
      } else {
        setUsers((prev) => [...prev, response.data]);
      }

      setFormData({
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
      await axios.delete(`http://localhost:5000/deleteUser/${id}`);
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

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" textAlign="center" mt={4} mb={4}>
        User Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 4 }}>
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
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
                <TableCell>{user.birth_date}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.role}</TableCell>
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
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" component="h2">
            {isEditing ? 'Edit User' : 'Add User'}
          </Typography>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Birth Date"
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
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
