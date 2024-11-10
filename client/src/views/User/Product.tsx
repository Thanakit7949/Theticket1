import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Grid, Badge } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Slider from "react-slick";
import molly from '/src/assets/home/molly.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [category, setCategory] = useState("Concert");
  const [subCategory, setSubCategory] = useState("");
  const [favorites, setFavorites] = useState([]); // New state for favorite products

  const concertCategories = [
    { label: "Flash Sales", products: [
      { id: 1, name: 'Concert T-Shirt', price: '500 ฿', image: '/src/assets/home/molly.jpg' },
      { id: 2, name: 'Album', price: '700 ฿', image: '/images/product2.jpg' },
    ] },
    { label: "Shirt", products: [
      { id: 3, name: 'Special Edition Shirt', price: '600 ฿', image: '/images/product3.jpg' },
    ] },
    { label: "Light Stick", products: [
      { id: 4, name: 'Light Stick', price: '300 ฿', image: '/images/product4.jpg' },
    ] },
    { label: "Album", products: [
      { id: 5, name: 'Got7', price: '1270 ฿', image: '/images/product4.jpg' },
    ] },
  ];

  const sportsCategories = [
    { label: "Flash Sales", products: [
      { id: 6, name: 'Sports Flash Sale Item', price: '250 ฿', image: '/images/product5.jpg' },
    ] },
    { label: "Shirt", products: [
      { id: 7, name: 'Sports Shirt', price: '700 ฿', image: '/images/product6.jpg' },
    ] },
    { label: "Scarf", products: [
      { id: 8, name: 'Sports Scarf', price: '250 ฿', image: '/images/product7.jpg' },
    ] },
    { label: "Shoes", products: [
      { id: 9, name: 'Sports Shoes', price: '1500 ฿', image: '/images/product8.jpg' },
    ] },
  ];

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleConcertClick = () => {
    setCategory("Concert");
    setSubCategory("");
  };

  const handleSportsClick = () => {
    setCategory("Sports");
    setSubCategory("");
  };

  const handleSubCategoryClick = (subCat) => {
    setSubCategory(subCat);
  };

  useEffect(() => {
    setSubCategory("Flash Sales");
  }, [category]);

  const handleFavoriteClick = (productId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  useEffect(() => {
    setSubCategory("Flash Sales");
  }, []);
  
  const getProducts = () => {
    if (category === "Concert") {
      return concertCategories.find(cat => cat.label === subCategory)?.products || [];
    } else if (category === "Sports") {
      return sportsCategories.find(cat => cat.label === subCategory)?.products || [];
    }
    return [];
  };

  const products = getProducts();

  return (
    <Box
      sx={{
        padding: 6,
        background: "linear-gradient(to right, #FFD1DC, #D6EFFF)",
        borderRadius: 8,
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
        margin: 'auto',
        width: "1090px",
        height: "3000px",
        border: '2px solid #FFA4A2',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Title with Icons */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 2,
          marginBottom: '30px',
          position: 'relative'
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 'bold',
            color: '#6A5ACD',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            paddingBottom: '10px',
            borderBottom: '4px solid #CC00FF',
            display: 'inline-block',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
         🛒 Best Products 🧺
        </Typography>

        <Box sx={{ position: 'absolute', right: 0, top: '-10px', display: 'flex', gap: 1 }}>
          <IconButton color="primary">
            <Badge badgeContent={favorites.length} color="error">
              <FavoriteBorderIcon sx={{ fontSize: 32 }} />
            </Badge>
          </IconButton>
          <IconButton color="primary">
            <ShoppingCartIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Search Field */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          width: '100%', 
          maxWidth: '300px',
          marginLeft: 'auto',
          marginBottom: '30px',
        }}
      >
        <TextField 
          fullWidth 
          label="Search..." 
          id="search" 
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

     {/* Image Carousel */}
     <Box sx={{ marginBottom: '30px' }}>
        <Slider {...sliderSettings}>
          {['/images/product1.jpg', '/images/product2.jpg', '/images/product3.jpg'].map((src, index) => (
            <Box key={index} sx={{ width: '100%', height: '400px', overflow: 'hidden' }}>
              <img
                src={src}
                alt={`Product ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          padding: '16px 0',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          marginTop: '60px',
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            margin: '0 20px',
            cursor: 'pointer',
            transition: 'color 0.3s, transform 0.2s',
            '&:hover': {
              color: '#1976d2',
              transform: 'scale(1.05)',
            },
          }}
          onClick={handleConcertClick}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Concerts
          </Typography>
        </Box>

        <Box
          sx={{
            margin: '0 20px',
            cursor: 'pointer',
            transition: 'color 0.3s, transform 0.2s',
            '&:hover': {
              color: '#1976d2',
              transform: 'scale(1.05)',
            },
          }}
          onClick={handleSportsClick}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Sports
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          padding: '12px 16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          marginTop: '20px',
          borderRadius: '8px',
        }}
      >
        {category === "Concert" && concertCategories.map((cat) => (
          <Box
            key={cat.label}
            sx={{
              margin: '0 20px',
              cursor: 'pointer',
              color: subCategory === cat.label ? '#1976d2' : 'inherit',
              transition: 'color 0.3s, transform 0.2s',
              '&:hover': {
                color: '#1976d2',
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => handleSubCategoryClick(cat.label)}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {cat.label}
            </Typography>
          </Box>
        ))}
        {category === "Sports" && sportsCategories.map((cat) => (
          <Box
            key={cat.label}
            sx={{
              margin: '0 20px',
              cursor: 'pointer',
              color: subCategory === cat.label ? '#1976d2' : 'inherit',
              transition: 'color 0.3s, transform 0.2s',
              '&:hover': {
                color: '#1976d2',
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => handleSubCategoryClick(cat.label)}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {cat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                border: '2px solid #FFB6C1',
                borderRadius: 2,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingBottom: '100%',
                  overflow: 'hidden',
                }}
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              </Box>
              <Box sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#888888', marginBottom: 1 }}>
                  {product.price}
                </Typography>
                <IconButton onClick={() => handleFavoriteClick(product.id)}>
                  <FavoriteBorderIcon color={favorites.includes(product.id) ? "error" : "inherit"} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Product;
