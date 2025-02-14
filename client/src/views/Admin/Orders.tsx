import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal } from '@mui/material';
import axios from 'axios';

interface OrderData {
  id: number;
  customer: string;
  product: string;
  status: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllOrders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleView = (order: OrderData) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleCancel = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deleteOrder/${id}`);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const handleClose = () => setOpen(false);

  if (loading) {
    return <Typography>Loading orders...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" textAlign="center" mt={4} mb={4}>
        Orders and Bookings
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Customer</TableCell>
              <TableCell sx={{ color: 'white' }}>Product</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleView(order)}>
                    View
                  </Button>
                  <Button variant="contained" color="error" size="small" onClick={() => handleCancel(order.id)}>
                    Cancel
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
            Order Details
          </Typography>
          {selectedOrder && (
            <Box>
              <Typography>ID: {selectedOrder.id}</Typography>
              <Typography>Customer: {selectedOrder.customer}</Typography>
              <Typography>Product: {selectedOrder.product}</Typography>
              <Typography>Status: {selectedOrder.status}</Typography>
            </Box>
          )}
          <Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
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
};

export default Orders;
