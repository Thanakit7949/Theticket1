import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importing ArrowBackIcon
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const products = [
    { id: '1', name: 'Concert T-Shirt', price: 500, image: '/src/assets/home/molly.jpg', description: 'Official concert T-shirt with high-quality fabric.' },
    { id: '2', name: 'Album', price: 700, image: '/images/product2.jpg', description: 'Latest album with exclusive tracks.' },
    { id: '3', name: 'Special Edition Shirt', price: 600, image: '/images/product3.jpg', description: 'Special edition shirt with unique designs.' },
    { id: '4', name: 'Light Stick', price: 300, image: '/images/product4.jpg', description: 'Light stick to show your support during concerts.' },
    { id: '5', name: 'Got7', price: 1270, image: '/images/product5.jpg', description: 'Exclusive Got7 merchandise.' },
    { id: '6', name: 'Sports Flash Sale Item', price: 250, image: '/images/product6.jpg', description: 'Limited-time sports item at a discounted price.' },
    { id: '7', name: 'Sports Shirt', price: 700, image: '/images/product7.jpg', description: 'High-quality sports shirt for active wear.' },
    { id: '8', name: 'Sports Scarf', price: 250, image: '/images/product8.jpg', description: 'Comfortable sports scarf for all seasons.' },
    { id: '9', name: 'Sports Shoes', price: 1500, image: '/images/product9.jpg', description: 'Durable and stylish sports shoes.' },
  ];

  useEffect(() => {
    const foundProduct = products.find((prod) => prod.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => Math.max(prev + increment, 1));
  };

  const handleConfirm = () => {
    // Navigate to the payment page with product details and quantity
    navigate('/payment', { state: { product, quantity } });
  };

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  const totalPrice = product.price * quantity;

  return (
    <Box sx={{ padding: 4, width: '400px', margin: 'auto', borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ marginBottom: 2 }}
      >
        Back
      </Button>
      <Box sx={{ position: 'relative' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
        <IconButton
          sx={{ position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        >
          <FavoriteBorderIcon color="error" />
        </IconButton>
      </Box>
      <Typography variant="h4" sx={{ marginTop: 2, fontWeight: 'bold' }}>{product.name}</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', marginTop: 1 }}>{product.description}</Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>Price: {product.price} ฿ / unit</Typography>
      
      <Divider sx={{ marginY: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginY: 2 }}>
        <Button variant="outlined" onClick={() => handleQuantityChange(-1)}>-</Button>
        <Typography variant="h6" sx={{ width: '40px', textAlign: 'center' }}>{quantity}</Typography>
        <Button variant="outlined" onClick={() => handleQuantityChange(1)}>+</Button>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 2 }}>Total Price: {totalPrice.toLocaleString()} ฿</Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ width: '100%', marginTop: 3, paddingY: 1 }}
        onClick={handleConfirm}
      >
        Confirm Purchase
      </Button>
    </Box>
  );
};

export default ProductDetail;
