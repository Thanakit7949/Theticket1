import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, CircularProgress, Card, CardContent, Grid } from '@mui/material';
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
      <Typography variant="h4" textAlign="center" mb={4} color="primary">
        Orders and Bookings
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'secondary.main' }}>
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
              <TableRow key={booking.booking_id} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
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
          <Typography variant="h6" component="h2" mb={2} color="primary">
            Booking Details
          </Typography>
          {selectedBooking && (
            <Card>
              <CardContent>
                <Typography variant="body1"><strong>Booking ID:</strong> {selectedBooking.booking_id}</Typography>
                <Typography variant="body1"><strong>User Name:</strong> {selectedBooking.user_name}</Typography>
                <Typography variant="body1"><strong>Concert Name:</strong> {selectedBooking.concert_name}</Typography>
                <Typography variant="body1"><strong>Zone Name:</strong> {selectedBooking.zone_name}</Typography>
                <Typography variant="body1"><strong>Booking Time:</strong> {new Date(selectedBooking.booking_time).toLocaleString()}</Typography>
                <Typography variant="body1"><strong>Total Price:</strong> {selectedBooking.total_price}</Typography>
              </CardContent>
            </Card>
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
