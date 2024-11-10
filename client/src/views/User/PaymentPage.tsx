import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, FormControl, Select, InputLabel, Snackbar } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaymentPage = () => {
  const location = useLocation();
  const { product, quantity } = location.state || {};

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [slip, setSlip] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [transactionReference, setTransactionReference] = useState('');
  const [open, setOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmit = () => {
    // Validate all fields
    if (!name || !surname || !address || !phone || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    // Generate a random order number
    const generatedOrderNumber = Math.floor(Math.random() * 1000000).toString();
    setOrderNumber(generatedOrderNumber);
    setOpen(true);

    // Handle the form submission (log the details)
    console.log({
      name,
      surname,
      address,
      phone,
      paymentMethod,
      slip,
      cardNumber,
      cardHolder,
      bankName,
      transactionReference,
      orderNumber: generatedOrderNumber,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 4, maxWidth: '500px', margin: 'auto', borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Payment Details</Typography>

      <Typography variant="h6">{product.name} x {quantity}</Typography>
      <Typography variant="h6">Total Price: {(product.price * quantity).toLocaleString()} ฿</Typography>

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginY: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        sx={{ marginY: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ marginY: 2 }}
        required
      />
      <TextField
        fullWidth
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={{ marginY: 2 }}
        required
      />

      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel>Payment Method</InputLabel>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <MenuItem value="Credit Card">Credit Card</MenuItem>
          <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
        </Select>
      </FormControl>

      {paymentMethod === 'Credit Card' && (
        <Box>
          <TextField
            fullWidth
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            sx={{ marginY: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Card Holder Name"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            sx={{ marginY: 2 }}
            required
          />
        </Box>
      )}

      {paymentMethod === 'Bank Transfer' && (
        <Box>
          <FormControl fullWidth sx={{ marginY: 2 }}>
            <InputLabel>Bank Name</InputLabel>
            <Select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            >
              <MenuItem value="Bank of America">Bank of America</MenuItem>
              <MenuItem value="Chase Bank">Chase Bank</MenuItem>
              <MenuItem value="Wells Fargo">Wells Fargo</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Transaction Reference Number"
            value={transactionReference}
            onChange={(e) => setTransactionReference(e.target.value)}
            sx={{ marginY: 2 }}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSlip(e.target.files[0])}
            style={{ marginY: 2 }}
          />
          <Typography variant="body2" color="text.secondary">Upload your transfer slip</Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Confirm Payment
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          คุณทำการสั่งซื้อเรียบร้อยแล้ว! หมายเลขสั่งซื้อของคุณคือ: {orderNumber}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentPage;
