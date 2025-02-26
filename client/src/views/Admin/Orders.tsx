import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, CircularProgress } from '@mui/material';
import axios from 'axios';

interface BookingData {
  booking_id: number;
  user_name: string;
  concert_name: string;
  zone_name: string;
  booking_time: string;
  total_price: number;
}

const Orders: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders/getAllOrders');
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
    setOpen(true);
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
