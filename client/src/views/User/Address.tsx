import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Address: React.FC = () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch address from server
    const fetchAddress = async () => {
      try {
        const response = await fetch('http://localhost:5000/getAddress');
        const data = await response.json();
        setAddress(data.address);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/updateAddress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      if (response.ok) {
        alert('Address updated successfully');
      } else {
        alert('Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6">ที่อยู่ของคุณ</Typography>
      <TextField
        label="ที่อยู่"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        บันทึก
      </Button>
    </Box>
  );
};

export default Address;
