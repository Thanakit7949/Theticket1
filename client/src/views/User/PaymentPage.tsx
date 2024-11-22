import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, FormControl, Select, InputLabel, Snackbar, List, ListItem, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaymentPage = () => {
  const location = useLocation();
  const { selectedProducts, totalPrice } = location.state || { selectedProducts: [], totalPrice: 0 };

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
    if (!name || !surname || !address || !phone || !paymentMethod) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const generatedOrderNumber = Math.floor(Math.random() * 1000000).toString();
    setOrderNumber(generatedOrderNumber);
    setOpen(true);

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

  return (
    <Box sx={{ padding: 4, maxWidth: '600px', margin: 'auto', borderRadius: 3, boxShadow: 4, bgcolor: 'background.paper' }}>
      <Typography variant="h4" sx={{ marginBottom: 2, color: 'primary.main', textAlign: 'center' }}>Payment</Typography>

      <List sx={{ marginBottom: 3 }}>
        {selectedProducts.map((item) => (
          <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f9f9f9', borderRadius: 2, padding: 1, mb: 1 }}>
            <ListItemText
              primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>}
              secondary={<Typography variant="body2" color="text.secondary">จำนวน: {item.quantity} ราคา: {item.price} </Typography>}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ marginBottom: 4, color: 'secondary.main', textAlign: 'center' }}>
        ราคารวมทั้งหมด: {totalPrice.toLocaleString()} บาท
      </Typography>

      <TextField fullWidth label="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} sx={{ marginY: 1 }} required />
      <TextField fullWidth label="นามสกุล" value={surname} onChange={(e) => setSurname(e.target.value)} sx={{ marginY: 1 }} required />
      <TextField fullWidth label="ที่อยู่" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ marginY: 1 }} required />
      <TextField fullWidth label="เบอร์โทรศัพท์" value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ marginY: 1 }} required />

      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel>วิธีการชำระเงิน</InputLabel>
        <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} sx={{ borderRadius: 2 }}>
          <MenuItem value="Credit Card">บัตรเครดิต</MenuItem>
          <MenuItem value="Bank Transfer">โอนผ่านธนาคาร</MenuItem>
        </Select>
      </FormControl>

      {paymentMethod === 'Credit Card' && (
        <Box>
          <TextField fullWidth label="หมายเลขบัตร" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} sx={{ marginY: 1 }} required />
          <TextField fullWidth label="ชื่อผู้ถือบัตร" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} sx={{ marginY: 1 }} required />
        </Box>
      )}

      {paymentMethod === 'Bank Transfer' && (
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ marginY: 1 }}>
            <InputLabel>ชื่อธนาคาร</InputLabel>
            <Select value={bankName} onChange={(e) => setBankName(e.target.value)} sx={{ borderRadius: 2 }} required>
              <MenuItem value="ธนาคารกรุงเทพ">ธนาคารกรุงเทพ</MenuItem>
              <MenuItem value="ธนาคารกรุงไทย">ธนาคารกรุงไทย</MenuItem>
            </Select>
          </FormControl>

          <TextField fullWidth label="รหัสอ้างอิงการโอน" value={transactionReference} onChange={(e) => setTransactionReference(e.target.value)} sx={{ marginY: 1 }} required />
          <input type="file" accept="image/*" onChange={(e) => setSlip(e.target.files[0])} style={{ marginY: 2 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>อัปโหลดสลิปโอนเงิน</Typography>
        </Box>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 3, padding: 1.5, fontSize: '1rem' }}>
        ยืนยันการชำระเงิน
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ bgcolor: 'primary.main', color: 'white' }}>
          การสั่งซื้อสำเร็จ! หมายเลขคำสั่งซื้อของคุณคือ: {orderNumber}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentPage;
