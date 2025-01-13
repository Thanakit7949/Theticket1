import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import qr from "/src/assets/product/qr.jpg";



const PaymentPage = () => {
  const [qrCode, setQrCode] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [slip, setSlip] = useState(null);


  useEffect(() => {
    if (paymentMethod === "Bank Transfer") {
      // จำลองการดึง QR Code จาก API
      setTimeout(() => {
        setQrCode(qr); // URL รูปภาพ QR Code
      }, 1000);
    }
  }, [paymentMethod]);



  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "600px",
        margin: "auto",
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "background.paper",
      }}
    >
     

      <FormControl fullWidth sx={{ marginY: 2 }}>
        <InputLabel>วิธีการชำระเงิน</InputLabel>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          sx={{ borderRadius: 2 }}
        >
          <MenuItem value="Bank Transfer">QR Code</MenuItem>
        </Select>
      </FormControl>

      

      {paymentMethod === "Bank Transfer" && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 2, color: "text.primary" }}>
            สแกน QR Code เพื่อชำระเงินผ่านพร้อมเพย์
          </Typography>
          {qrCode ? (
            <img
              src={qrCode}
              alt="QR Code พร้อมเพย์"
              style={{
                maxWidth: "100%",
                height: "auto",
                border: "1px solid #ccc",
                borderRadius: 8,
              }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              กำลังโหลด QR Code...
            </Typography>
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              อัปโหลดสลิปการโอนเงิน:
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSlip(e.target.files[0])}
              style={{ marginBottom: "10px" }}
            />
            {slip && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">ตัวอย่างสลิปที่แนบมา:</Typography>
                <img
                  src={URL.createObjectURL(slip)}
                  alt="สลิปการโอนเงิน"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}

      
    </Box>
  );
};

export default PaymentPage;
