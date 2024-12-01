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

interface SportData {
  id?: number;
  name: string;
  date: string;
  location: string;
  price: number;
  available_seats: number;
}

const Dbsports: React.FC = () => {
  const [sports, setSports] = useState<SportData[]>([]);
  const [formData, setFormData] = useState<SportData>({
    name: '',
    date: '',
    location: '',
    price: 0,
    available_seats: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to format the date to yyyy-MM-dd format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/getAllSports');
      // Format the date before storing in the state
      const formattedSports = response.data.map((sport: SportData) => ({
        ...sport,
        date: formatDate(sport.date),
      }));
      setSports(formattedSports);
    } catch (error) {
      console.error('Error fetching sports:', error);
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
        date: new Date(formData.date).toISOString(), // Convert back to ISO before sending to backend
      };
      const url = isEditing
        ? `http://localhost:5000/updateSport/${formData.id}`
        : 'http://localhost:5000/addSport';
      const method = isEditing ? axios.put : axios.post;
      await method(url, payload);
      fetchSports();
      setFormData({ name: '', date: '', location: '', price: 0, available_seats: 0 });
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding/updating sport:', error.response?.data || error.message);
    }
  };

  const handleEdit = (sport: SportData) => {
    setFormData(sport);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deleteSport/${id}`);
      fetchSports();
    } catch (error) {
      console.error('Error deleting sport:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" mt={4} mb={4}>
        Sports Management
      </Typography>
      <Box>
        <TextField
          label="Sport Name"
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
          value={formData.date} // Formatted date in yyyy-MM-dd
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
          {isEditing ? 'Update Sport' : 'Add Sport'}
        </Button>
      </Box>
      <Grid container spacing={2} mt={4}>
        {sports.map((sport) => (
          <Grid item xs={12} key={sport.id}>
            <Box border={1} borderRadius={2} p={2}>
              <Typography variant="h6">{sport.name}</Typography>
              <Typography>Date: {sport.date}</Typography>
              <Typography>Location: {sport.location}</Typography>
              <Typography>Price: {sport.price}</Typography>
              <Typography>Available Seats: {sport.available_seats}</Typography>
              <Button variant="contained" color="secondary" onClick={() => handleEdit(sport)}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ marginLeft: '8px' }}
                onClick={() => handleDelete(sport.id!)}
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

export default Dbsports;
