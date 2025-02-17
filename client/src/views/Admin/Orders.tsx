import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import axios from 'axios';

interface BookingData {
  booking_id: number;
  user_id: number;
  concert_id: number;
  zone_id: number;
  booking_time: string;
  total_price: number;
  user_name: string;
  concert_name: string;
  zone_name: string;
  status: string;
}

const Orders: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [status, setStatus] = useState('');

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllBookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleView = (booking: BookingData) => {
    setSelectedBooking(booking);
    setStatus(booking.status || ''); // Ensure status is controlled
    setOpen(true);
  };

  const handleStatusChange = async () => {
    if (selectedBooking) {
      try {
        await axios.put(`http://localhost:5000/updateBookingStatus/${selectedBooking.booking_id}`, { status });
        setBookings((prev) =>
          prev.map((booking) =>
            booking.booking_id === selectedBooking.booking_id ? { ...booking, status } : booking
          )
        );
        setOpen(false);
      } catch (error) {
        console.error('Error updating booking status:', error);
      }
    }
  };

  const handleClose = () => setOpen(false);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Orders and Bookings
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Booking ID</TableCell>
              <TableCell sx={{ color: 'white' }}>User Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Concert Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Zone Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Booking Time</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Price</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.booking_id}>
                <TableCell>{booking.booking_id}</TableCell>
                <TableCell>{booking.user_name}</TableCell>
                <TableCell>{booking.concert_name}</TableCell>
                <TableCell>{booking.zone_name}</TableCell>
                <TableCell>{new Date(booking.booking_time).toLocaleString()}</TableCell>
                <TableCell>{booking.total_price}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleView(booking)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" component="h2" mb={2}>
            Booking Details
          </Typography>
          {selectedBooking && (
            <Box>
              <Typography>Booking ID: {selectedBooking.booking_id}</Typography>
              <Typography>User Name: {selectedBooking.user_name}</Typography>
              <Typography>Concert Name: {selectedBooking.concert_name}</Typography>
              <Typography>Zone Name: {selectedBooking.zone_name}</Typography>
              <Typography>Booking Time: {new Date(selectedBooking.booking_time).toLocaleString()}</Typography>
              <Typography>Total Price: {selectedBooking.total_price}</Typography>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Seat Changed">Seat Changed</MenuItem>
                  <MenuItem value="Concert Changed">Concert Changed</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" onClick={handleStatusChange} sx={{ mt: 2 }}>
                Update Status
              </Button>
            </Box>
          )}
          <Button variant="contained" color="secondary" onClick={handleClose} sx={{ mt: 2 }}>
            Close
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
  borderRadius: 2,
};

export default Orders;
