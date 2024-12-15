import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios'; // เพิ่ม AxiosError
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
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchConcerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllConcerts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setConcerts(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching sports:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // โหลดข้อมูลครั้งแรก
  useEffect(() => {
    fetchConcerts();
  }, []);

  // ฟังก์ชันจัดการฟอร์ม
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'available_seats' ? parseInt(value) : value,
    }));
  };

  // ฟังก์ชันเพิ่มหรืออัปเดตข้อมูล
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
      await method(url, payload);
      fetchConcerts(); // โหลดข้อมูลใหม่หลังอัปเดต
      setFormData({ name: '', date: '', location: '', price: 0, available_seats: 0 });
      setIsEditing(false);
    } catch (error) {
      console.error(
        'Error adding/updating concert:',
        error.response?.data?.message || error.message
      );
    }
  };

  // ฟังก์ชันตั้งค่าแก้ไขข้อมูล
  const handleEdit = (concert: ConcertData) => {
    setFormData({
      ...concert,
      date: concert.date.split('T')[0], // แปลงวันที่ให้เป็น yyyy-MM-dd
    });
    setIsEditing(true);
  };

  // ฟังก์ชันลบข้อมูล
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deleteConcert/${id}`);
      fetchConcerts();
    } catch (error) {
      console.error('Error deleting concert:', error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return <Typography>Loading concerts...</Typography>;
  }

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
          value={formData.date}
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
              <Typography>Date: {new Date(concert.date).toLocaleDateString()}</Typography>
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
                onClick={() => concert.id && handleDelete(concert.id)}
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
