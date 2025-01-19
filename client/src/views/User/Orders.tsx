import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch orders from server
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/getAllOrders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteOrder/${orderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setOrders(orders.filter((order) => order.id !== orderId));
        alert('Order cancelled successfully');
      } else {
        alert('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6">ออเดอร์ของคุณ</Typography>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => (
          <Box key={order.id} sx={{ mb: 2 }}>
            <Typography>Order ID: {order.id}</Typography>
            <Typography>Product: {order.product_name}</Typography>
            <Typography>Quantity: {order.quantity}</Typography>
            <Typography>Total Price: {order.total_price}</Typography>
            <Button variant="contained" color="secondary" onClick={() => handleCancelOrder(order.id)}>
              ยกเลิกออเดอร์
            </Button>
          </Box>
        ))
      ) : (
        <Typography>ไม่มีออเดอร์</Typography>
      )}
    </Box>
  );
};

export default Orders;
