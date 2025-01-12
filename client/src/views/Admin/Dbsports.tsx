import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface SportData {
  id?: number;
  name: string;
  date: string;
  location: string;
  price: number;
  available_seats: number;
  type: string;
}

const Dbsports: React.FC = () => {
  const [sports, setSports] = useState<SportData[]>([]);
  const [formData, setFormData] = useState<SportData>({
    name: '',
    date: '',
    location: '',
    price: 0,
    available_seats: 0,
    type: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchSports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllSports', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSports(response.data);
    } catch (error) {
      console.error('Error fetching sports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: name === 'price' || name === 'available_seats' ? parseInt(value as string) : value,
    }));
  };

  const handleAddOrUpdate = async () => {
    try {
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };
      const url = isEditing
        ? `http://localhost:5000/updateSport/${formData.id}`
        : 'http://localhost:5000/addSport';
      const method = isEditing ? axios.put : axios.post;
      const response = await method(url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (isEditing) {
        setSports((prev) => prev.map((sport) => (sport.id === formData.id ? response.data : sport)));
      } else {
        setSports((prev) => [...prev, response.data]);
      }

      setFormData({ name: '', date: '', location: '', price: 0, available_seats: 0, type: '' });
      setIsEditing(false);
      setOpen(false);
    } catch (error) {
      console.error('Error adding/updating sport:', error);
    }
  };

  const handleEdit = (sport: SportData) => {
    setFormData({
      ...sport,
      date: sport.date.split('T')[0],
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deleteSport/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSports((prev) => prev.filter((sport) => sport.id !== id));
    } catch (error) {
      console.error('Error deleting sport:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) {
    return <Typography>Loading sports...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" textAlign="center" mt={4} mb={4}>
        Sports Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 4 }}>
        Add Sport
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Available Seats</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sports.map((sport) => (
              <TableRow key={sport.id}>
                <TableCell>{sport.id}</TableCell>
                <TableCell>{sport.name}</TableCell>
                <TableCell>{new Date(sport.date).toLocaleDateString()}</TableCell>
                <TableCell>{sport.location}</TableCell>
                <TableCell>{sport.price}</TableCell>
                <TableCell>{sport.available_seats}</TableCell>
                <TableCell>{sport.type}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleEdit(sport)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small" onClick={() => sport.id && handleDelete(sport.id)}>
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
            {isEditing ? 'Edit Sport' : 'Add Sport'}
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Available Seats"
            name="available_seats"
            type="number"
            value={formData.available_seats}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleFormChange}
            >
              <MenuItem value="Indoor">Indoor</MenuItem>
              <MenuItem value="Outdoor">Outdoor</MenuItem>
            </Select>
          </FormControl>
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

export default Dbsports;
