import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Avatar, Button, Card, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts } = location.state || { selectedProducts: [] };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, item) => {
      const price = parseFloat(item.price.replace('฿', '').trim());
      return total + price * item.quantity;
    }, 0);
  };

  // แก้ไขปุ่ม navigate เพื่อส่ง selectedProducts ไปยัง PaymentPage
const handleGoToPayment = () => {
  navigate('payment', { state: { selectedProducts, totalPrice: calculateTotalPrice() } });
};


  return (
    <Box sx={{ width: 800, margin: 'auto', padding: 6, textAlign: 'center', backgroundColor: 'pink'}}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 4, color: '#333' }}>
        รายละเอียดสินค้า
      </Typography>
      <List>
        {selectedProducts.map((item) => (
          <Card key={item.id} sx={{ marginBottom: 2, boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)', borderRadius: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              {/* แสดงรูปภาพสินค้า */}
              <Avatar
                src={item.image}
                alt={item.name}
                sx={{ width: 80, height: 80, marginRight: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
              />
              {/* แสดงชื่อสินค้าและราคา */}
              <ListItemText
                primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>{item.name}</Typography>}
                secondary={
                  <Typography variant="body2" sx={{ color: '#888' }}>
                    จำนวน: {item.quantity} | ราคา: {item.price} 
                  </Typography>
                }
              />
            </CardContent>
          </Card>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 4, color: '#444' }}>
        ราคารวม: {calculateTotalPrice()} บาท
      </Typography>

      {/* ปุ่มสำหรับไปหน้า PaymentPage */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoToPayment}
        sx={{
          padding: '12px 40px',
          fontWeight: 'bold',
          fontSize: '18px',
          borderRadius: '8px',
          backgroundColor: '#ff6f61',
          color: '#fff',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#ff5a4d',
          },
        }}
      >
        ไปที่หน้าชำระเงิน
      </Button>
    </Box>
  );
};

export default ProductDetail;
