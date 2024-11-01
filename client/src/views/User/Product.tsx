import React from 'react';
import { Box, Typography, Grid, Button, Card, CardMedia, CardContent, TextField, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search"; 




const Product = () => {
  function handleConcertClick(event: MouseEvent<HTMLDivElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  function handleSportsClick(event: MouseEvent<HTMLDivElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Box
      sx={{
        padding: 6,
        background: "linear-gradient(to right, #FFD1DC, #D6EFFF)", // Bright pastel gradient
        borderRadius: 8,
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
        margin: 'auto',
        width: "1090px",
        height: "3000px",
        border: '2px solid #FFA4A2', // Vibrant pastel pink border
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden', 
        // transition: 'transform 0.4s, box-shadow 0.4s', // Smooth hover animation
        // '&:hover': {
        //   transform: 'scale(1.03)',
        //   boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.2)',
        // },
      }}
    >
      {/* Animated decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '-30px',
          left: '-30px',
          width: '120px',
          height: '120px',
          backgroundColor: '#FFE4E1',
          borderRadius: '50%',
          opacity: 0.5,
          animation: 'float 7s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-50px',
          right: '-40px',
          width: '180px',
          height: '180px',
          backgroundColor: '#D8FFF2',
          borderRadius: '50%',
          opacity: 0.5,
          animation: 'float 10s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: '40px',
          height: '40px',
          backgroundColor: '#FFFAE3',
          borderRadius: '50%',
          opacity: 0.8,
          animation: 'float 6s ease-in-out infinite',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Title */}
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontWeight: 'bold',
          color: '#6A5ACD',
          textTransform: 'uppercase',  // Make uppercase
          letterSpacing: '2px',        // Spacing between letters
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  // Text shadow
          position: 'relative',
          paddingBottom: '10px',      // Space below text
          borderBottom: '4px solid #CC00FF',  // Underline color
          display: 'inline-block',    // Underline only under text
          marginBottom: '30px',
          transition: 'transform 0.3s ease', // Hover effect
          '&:hover': {
            transform: 'scale(1.05)',
          },
      
        }}
      >
       🛒 Products 🧺
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          color: '#4B4453',
          marginBottom: '5px',
          lineHeight: 1.8,
          fontSize: '1.3rem',
          padding: '0 25px',
          fontStyle: 'italic',
          fontWeight: '500',
        }}
      >
       
      </Typography>

      <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', // Align to the right
                width: '100%', // Full width
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
        
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',  // Light background color
        padding: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Navbar item for Concert */}
      <Box
        sx={{
          margin: '0 20px',
          cursor: 'pointer',
          transition: 'color 0.3s',
          '&:hover': {
            color: '#1976d2',  // Color on hover
          },
        }}
        onClick={handleConcertClick}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          คอนเสิร์ต
        </Typography>
      </Box>

      {/* Navbar item for Sports */}
      <Box
        sx={{
          margin: '0 20px',
          cursor: 'pointer',
          transition: 'color 0.3s',
          '&:hover': {
            color: '#1976d2',  // Color on hover
          },
        }}
        onClick={handleSportsClick}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          กีฬา
        </Typography>
      </Box>
    </Box>

      
    </Box>
  );
};

export default Product;
