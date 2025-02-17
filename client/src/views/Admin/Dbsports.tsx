import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

interface SportData {
  id?: number;
  name: string;
  date: string;
  location: string;
  price: number;
  available_seats: number;
  type: string;
}

interface ZoneData {
  id?: number;
  sport_id?: number;
  name: string;
  seat_count: number;
}

const Dbsports: React.FC = () => {
  const [sports, setSports] = useState<SportData[]>([]);
  const [zones, setZones] = useState<ZoneData[]>([]);
  const [formData, setFormData] = useState<SportData>({
    name: '',
    date: '',
    location: '',
    price: 0,
    available_seats: 0,
    type: '',
  });
  const [zoneData, setZoneData] = useState<ZoneData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});

  const fetchSports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllSports');
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

  const handleZoneChange = (index: number, e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    const updatedZones = [...zoneData];
    updatedZones[index] = {
      ...updatedZones[index],
      [name as string]: name === 'seat_count' ? parseInt(value as string) : value,
    };
    setZoneData(updatedZones);
  };

  const addZones = () => {
    setZoneData([...zoneData, { name: '', seat_count: 0 }]);
  };

  const removeZones = (index: number) => {
    const updatedZones = [...zoneData];
    updatedZones.splice(index, 1);
    setZoneData(updatedZones);
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
      const response = await method(url, payload);

      if (isEditing) {
        setSports((prev) => prev.map((sport) => (sport.id === formData.id ? response.data : sport)));
        await updateZonesAndSeats(formData.id!);
        alert('Sport updated successfully!');
      } else {
        const newSport = { ...formData, id: response.data.id };
        setSports((prev) => [...prev, newSport]);
        await addZonesAndSeats(newSport.id!);
        alert('Sport added successfully!');
      }

      setFormData({ name: '', date: '', location: '', price: 0, available_seats: 0, type: '' });
      setZoneData([]);
      setIsEditing(false);
      setOpen(false);
    } catch (error) {
      console.error('Error adding/updating sport:', error);
      alert('Failed to add/update sport.');
    }
  };

  const addZonesAndSeats = async (sportId: number) => {
    try {
      for (const zone of zoneData) {
        const zoneResponse = await axios.post('http://localhost:5000/addSportZone', {
          sport_id: sportId,
          name: zone.name,
          seat_count: zone.seat_count,
        });
        const zoneId = zoneResponse.data.id;
        for (let i = 0; i < zone.seat_count; i++) {
          await axios.post('http://localhost:5000/addSportSeat', {
            zone_id: zoneId,
            seat_number: `Seat ${i + 1}`,
          });
        }
      }
    } catch (error) {
      console.error('Error adding zones and seats:', error);
      alert('Failed to add zones and seats.');
    }
  };

  const updateZonesAndSeats = async (sportId: number) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteZonesBySport/${sportId}`);
      if (response.status === 200) {
        await addZonesAndSeats(sportId);
      }
    } catch (error) {
      console.error('Error updating zones and seats:', error);
      alert('Failed to update zones and seats.');
    }
  };

  const handleEdit = async (sport: SportData) => {
    setFormData({
      ...sport,
      date: sport.date.split('T')[0],
    });
    setIsEditing(true);
    setOpen(true);

    try {
      const response = await axios.get(`http://localhost:5000/getZoneSport?sport_id=${sport.id}`);
      setZoneData(response.data);
    } catch (error) {
      console.error('Error fetching zones:', error);
      alert('Failed to fetch zones.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deleteSport/${id}`);
      setSports((prev) => prev.filter((sport) => sport.id !== id));
      alert('Sport deleted successfully!');
    } catch (error) {
      console.error('Error deleting sport:', error);
      alert('Failed to delete sport.');
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
    return <Typography>Loading sports...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" textAlign="center" mt={4} mb={4}>
        Sports Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleConfirmOpen(handleOpen)}
        sx={{ mb: 4 }}
      >
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
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Edit />}
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(sport)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleConfirmOpen(() => handleDelete(sport.id!))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%', maxWidth: '800px' }}>
          <Typography variant="h6" component="h2">
            {isEditing ? 'Edit Sport' : 'Add Sport'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Available Seats"
                name="available_seats"
                type="number"
                value={formData.available_seats}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                >
                  <MenuItem value="football">Football</MenuItem>
                  <MenuItem value="boxing">Boxing</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
            Zones
          </Typography>
          {zoneData.map((zone, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              <Grid item xs={5}>
                <TextField
                  label="Zone Name"
                  name="name"
                  value={zone.name}
                  onChange={(e) => handleZoneChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Seat Count"
                  name="seat_count"
                  type="number"
                  value={zone.seat_count}
                  onChange={(e) => handleZoneChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeZones(index)}
                  sx={{ mt: 2 }}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={addZones}>
              Add Zone
            </Button>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleConfirmOpen(handleAddOrUpdate)}
                sx={{ mr: 2 }}
              >
                {isEditing ? 'Update' : 'Add'}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
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

export default Dbsports;
