import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from '@mui/material';

interface ConcertData {
  id?: number;
  name: string;
  date: string;
  location: string;
  price: number;
  available_seats: number;
}

const Dbconcerts: React.FC = () => {
  const [concerts, setConcerts] = useState<ConcertData[]>([]);
  const [formData, setFormData] = useState<ConcertData>({
    name: '',
    date: '',
    location: '',
    price: 0,
    available_seats: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันแปลงวันที่ให้เป็นรูปแบบ yyyy-MM-dd
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/getAllConcerts');
      // แปลงวันที่ก่อนเก็บใน state
      const formattedConcerts = response.data.map((concert: ConcertData) => ({
        ...concert,
        date: formatDate(concert.date),
      }));
      setConcerts(formattedConcerts);
    } catch (error) {
      console.error('Error fetching concerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'available_seats' ? parseInt(value) : value,
    }));
  };

  const handleAddOrUpdate = async () => {
    try {
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(), // แปลงกลับเป็น ISO ก่อนส่งไป Backend
      };
      const url = isEditing
        ? `http://localhost:5000/updateConcert/${formData.id}`
        : 'http://localhost:5000/addConcert';
      const method = isEditing ? axios.put : axios.post;
      await method(url, payload);
      fetchConcerts();
      setFormData({ name: '', date: '', location: '', price: 0, available_seats: 0 });
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding/updating concert:', error.response?.data || error.message);
    }
  };

  const handleEdit = (concert: ConcertData) => {
    setFormData(concert);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deleteConcert/${id}`);
      fetchConcerts();
    } catch (error) {
      console.error('Error deleting concert:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" mt={4} mb={4}>
        Concert Management
      </Typography>
      <Box>
        <TextField
          label="Concert Name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          name="date"
          value={formData.date} // วันที่ที่ถูกแปลงเป็น yyyy-MM-dd
          onChange={handleFormChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
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
          type="number"
          name="price"
          value={formData.price}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Available Seats"
          type="number"
          name="available_seats"
          value={formData.available_seats}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOrUpdate}
          fullWidth
          style={{ marginTop: '16px' }}
        >
          {isEditing ? 'Update Concert' : 'Add Concert'}
        </Button>
      </Box>
      <Grid container spacing={2} mt={4}>
        {concerts.map((concert) => (
          <Grid item xs={12} key={concert.id}>
            <Box border={1} borderRadius={2} p={2}>
              <Typography variant="h6">{concert.name}</Typography>
              <Typography>Date: {concert.date}</Typography>
              <Typography>Location: {concert.location}</Typography>
              <Typography>Price: {concert.price}</Typography>
              <Typography>Available Seats: {concert.available_seats}</Typography>
              <Button variant="contained" color="secondary" onClick={() => handleEdit(concert)}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ marginLeft: '8px' }}
                onClick={() => handleDelete(concert.id!)}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dbconcerts;
