import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const BankInfo: React.FC = () => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  useEffect(() => {
    // Fetch bank info from server
    const fetchBankInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/getBankInfo');
        const data = await response.json();
        setBankName(data.bankName);
        setAccountNumber(data.accountNumber);
        setAccountHolder(data.accountHolder);
      } catch (error) {
        console.error('Error fetching bank info:', error);
      }
    };

    fetchBankInfo();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/updateBankInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bankName, accountNumber, accountHolder }),
      });
      if (response.ok) {
        alert('Bank info updated successfully');
      } else {
        alert('Failed to update bank info');
      }
    } catch (error) {
      console.error('Error updating bank info:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6">ข้อมูลธนาคาร</Typography>
      <TextField
        label="ชื่อธนาคาร"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="เลขที่บัญชี"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ชื่อผู้ถือบัญชี"
        value={accountHolder}
        onChange={(e) => setAccountHolder(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        บันทึก
      </Button>
    </Box>
  );
};

export default BankInfo;
