import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ConcertData {
  id?: number;
  name: string;
  date: string;
  location: string;
  price: number;
  available_seats: number;
  type: string;
}

const Dbconcerts: React.FC = () => {
  const [concerts, setConcerts] = useState<ConcertData[]>([]);
  const [formData, setFormData] = useState<ConcertData>({
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});

  const fetchConcerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllConcerts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setConcerts(response.data);
    } catch (error) {
      console.error('Error fetching concerts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerts();
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
        ? `http://localhost:5000/updateConcert/${formData.id}`
        : 'http://localhost:5000/addConcert';
      const method = isEditing ? axios.put : axios.post;
      const response = await method(url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (isEditing) {
        setConcerts((prev) => prev.map((concert) => (concert.id === formData.id ? response.data : concert)));
        alert('Concert updated successfully!');
      } else {
        setConcerts((prev) => [...prev, { ...formData, id: response.data.id }]);
        alert('Concert added successfully!');
      }

      setFormData({ name: '', date: '', location: '', price: 0, available_seats: 0, type: '' });
      setIsEditing(false);
      setOpen(false);
    } catch (error) {
      console.error('Error adding/updating concert:', error);
      alert('Failed to add/update concert.');
    }
  };

  const handleEdit = (concert: ConcertData) => {
    setFormData({
      ...concert,
      date: concert.date.split('T')[0],
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deleteConcert/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setConcerts((prev) => prev.filter((concert) => concert.id !== id));
      alert('Concert deleted successfully!');
    } catch (error) {
      console.error('Error deleting concert:', error);
      alert('Failed to delete concert.');
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmOpen = (action: () => void) => {
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirm = () => {
    confirmAction();
    setConfirmOpen(false);
  };

  if (loading) {
    return <Typography>Loading concerts...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" textAlign="center" mt={4} mb={4}>
        Concert Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleConfirmOpen(handleOpen)} sx={{ mb: 4 }}>
        Add Concert
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
            {concerts.map((concert) => (
              <TableRow key={concert.id}>
                <TableCell>{concert.id}</TableCell>
                <TableCell>{concert.name}</TableCell>
                <TableCell>{new Date(concert.date).toLocaleDateString()}</TableCell>
                <TableCell>{concert.location}</TableCell>
                <TableCell>{concert.price}</TableCell>
                <TableCell>{concert.available_seats}</TableCell>
                <TableCell>{concert.type}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleEdit(concert)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small" onClick={() => handleConfirmOpen(() => handleDelete(concert.id!))}>
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
            {isEditing ? 'Edit Concert' : 'Add Concert'}
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
              <MenuItem value="kpop">Kpop</MenuItem>
              <MenuItem value="tpop">Tpop</MenuItem>
              <MenuItem value="inter">Inter</MenuItem>
              <MenuItem value="thaimass">Thaimass</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={() => handleConfirmOpen(handleAddOrUpdate)} sx={{ mt: 2 }}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose} sx={{ mt: 2, ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to proceed with this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
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

export default Dbconcerts;
