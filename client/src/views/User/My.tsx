import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Paymentv: React.FC = () => {
  const location = useLocation();
  const { price, label, selectedSeats } = location.state || {}; // ค่าที่ส่งมาจากหน้า Concert

  // แปลงราคาเป็นตัวเลข (เอาเฉพาะตัวเลขออกจากข้อความ)
  const numericPrice = price ? parseFloat(price.replace(/[^\d.-]/g, "")) : 0;

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        width: "450px",
        maxWidth: "none",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 2, textAlign: "left" }}
      >
        ข้อมูลการชำระเงิน
      </Typography>

      {/* แสดงราคารวม */}
      <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>ราคารวม:</span>
          <span>
            {selectedSeats.length > 0
              ? `฿${numericPrice * selectedSeats.length}` // คูณจำนวนที่นั่งกับราคา
              : "กรุณาเลือกที่นั่ง"}
          </span>
        </Box>
      </Typography>

      <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
        โซนที่นั่ง: {label}
      </Typography>

      <Typography variant="h6" sx={{ mb: 2, textAlign: "left" }}>
        ที่นั่งที่เลือก:{" "}
        {selectedSeats.length > 0
          ? selectedSeats
              .map(
                (seat: { row: number; col: number }) =>
                  `${label}${seat.row}-${seat.col}`
              )
              .join(" / ") // Joining the seats with a separator (e.g., " / ")
          : "ยังไม่ได้เลือกที่นั่ง"}
      </Typography>
    </Box>
  );
};

export default Paymentv;
