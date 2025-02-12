import React, { useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import image from "/src/assets/concert/thang.png";
import image1 from "/src/assets/concert/thang1.png";

const TicketConcert: React.FC = () => {
  const location = useLocation();
  const { price, label, selectedSeats } = location.state || {}; // ดึงข้อมูลจาก state
useEffect(() => {
      if (!location.state) {
        console.log("ไม่มีข้อมูล state ที่ถูกส่งมา");
      } else {
        console.log("location.state:", location.state);
        console.log("selectedSeats:", selectedSeats);
      }
    }, [location.state, selectedSeats]);
  const numericPrice = price ? parseFloat(price.replace(/[^\d.-]/g, "")) : 0;
  const totalSeatPrice = numericPrice * selectedSeats.length;
  const vatAmount = totalSeatPrice * 0.07;
  const serviceFee = totalSeatPrice * 0.07 * 1.07
  const totalPrice = totalSeatPrice + vatAmount + serviceFee;

  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "auto", borderRadius: 2, boxShadow: 3, bgcolor: "background.paper" }}>
      <Typography variant="h4" color="#FF4081" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
        คุณทำการสั่งซื้อเรียบร้อยแล้ว!!!
      </Typography>
      
      <Box sx={{ padding: 2, color: "#151515" }}>
        {/* แสดงข้อมูลจาก state */}
        <Box>
          <Typography variant="h6">Concert: Y and Pride Perspectives Talk</Typography>
          <Typography variant="h6" color="gray">📅 6 ธันวาคม 2024</Typography>
          <Typography variant="h6" color="gray">🕒 17:00 – 22:00 น.</Typography>
          <Typography variant="h6" color="gray">📍 Glowfish Siam Patumwan</Typography>
        </Box>

        <Divider sx={{ backgroundColor: "gray", my: 2 }} />
        
        {/* ข้อมูลการสั่งซื้อ */}
        <Box sx={{ mt: 2 }}>
          <Typography sx={{display: "flex"}} variant="h6">หมายเลขคำสั่งซื้อ: 2024111413633000264</Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">จำนวนบัตร:</Typography>
              <Typography variant="h6">{selectedSeats.length} ใบ</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              <Typography variant="h6">โซน:</Typography>
              <Typography variant="h6">{label}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ textAlign: "left", color: "black" }}>ที่นั่งที่เลือก:</Typography>
              <Typography variant="h6" sx={{ textAlign: "right", color: "black" }}>
                {selectedSeats.length > 0 ? selectedSeats.join(" / ") : "ยังไม่ได้เลือกที่นั่ง"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">ราคาบัตร:</Typography>
              <Typography variant="h6">฿{numericPrice}</Typography>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "gray", my: 2 }} />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">ราคารวม:</Typography>
            <Typography variant="h6">฿{totalSeatPrice.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">ค่าบริการ (VAT 7%):</Typography>
            <Typography variant="h6">฿{vatAmount.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">ค่าธรรมเนียมการชำระเงิน (VAT 7%):</Typography>
            <Typography variant="h6">฿{serviceFee.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ backgroundColor: "gray", my: 2 }} />
        
          <Box  sx={{ display: "flex", justifyContent: "space-between" ,color:"red",}}>
            <Typography fontWeight="bold" variant="h6">ราคารวมสุทธิ:</Typography>
            <Typography fontWeight="bold"  variant="h6">฿{totalPrice.toFixed(2)}</Typography>
            
          </Box>
          <Divider sx={{ backgroundColor: "gray", my: 2 }} />
           {/* เพิ่ม Box สำหรับรูปภาพและข้อความ */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
        <img src={image} alt="Left Image" style={{ width: 100, height: 100 }} />
        
        {/* ข้อความกลาง */}
        <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}> INTERGETHER</Typography>
        
        <img src={image1} alt="Right Image" style={{ width: 120, height: 120 }} />
      </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TicketConcert;
