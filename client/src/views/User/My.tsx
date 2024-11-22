import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Payment: React.FC = () => {
  const location = useLocation();
  const { price, label, selectedSeats } = location.state || {}; // ค่าที่ส่งมาจากหน้า Concert

  // แปลงราคาเป็นตัวเลข (เอาเฉพาะตัวเลขออกจากข้อความ)
  const numericPrice = price ? parseFloat(price.replace(/[^\d.-]/g, "")) : 0;

  const totalSeatPrice = numericPrice * selectedSeats.length;
  const vatAmount = totalSeatPrice * 0.07;
  const serviceFee = vatAmount * 1.07;
  const totalPrice = totalSeatPrice + vatAmount + serviceFee;

  const navigate = useNavigate();

  return (
    <Box
      p={2}
      mb={8}
      bgcolor="gray.800"
      color="white"
      borderRadius={2}
      boxShadow={3}
      border={1}
      borderColor="gray.700"
      width={970}
      maxHeight="none"
      height={1750}
      sx={{
        background: "linear-gradient(135deg, #EECDA3 0%, #EF629F 100%);",
      }}
    >
      {/* Sidebar ซ้าย */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "940px",
          mr: 2,
        }}
      ></Box>
      <Box
        sx={{
          width: "940px",
          maxWidth: "none",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          borderBottom: "1px solid #000", // เส้นขีดใต้ข้อความ
          paddingBottom: "5px", // เพิ่มระยะห่างระหว่างข้อความกับเส้นขีด
          flexWrap: "wrap",
          marginTop: "2px",
        }}
      >
        {/* แสดงราคารวม */}
        <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "15px",
              color: "black",
            }}
          >
            <span>{label}:</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${numericPrice * selectedSeats.length}` // คูณจำนวนที่นั่งกับราคา
                : "กรุณาเลือกที่นั่ง"}
            </span>
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 1, textAlign: "left", color: "black" }}
        >
          โซนที่นั่ง: {label}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            textAlign: "left",
            borderBottom: "1px solid #000", // เส้นขีดใต้ข้อความ
            paddingBottom: "5px", // เพิ่มระยะห่างระหว่างข้อความกับเส้นขีด
            color: "black",
          }}
        >
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

        {/* ราคารวม */}
        <Typography
          variant="h6"
          sx={{ mb: 1, textAlign: "left", color: "black" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>ราคารวม</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${(numericPrice * selectedSeats.length).toFixed(2)}` // คูณจำนวนที่นั่งกับราคา
                : "กรุณาเลือกที่นั่ง"}
            </span>
          </Box>
        </Typography>

        {/* ค่าบริการ (VAT incl.) */}
        <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              color: "black",
            }}
          >
            <span>ค่าบริการ (VAT incl.)</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${(numericPrice * selectedSeats.length * 0.07).toFixed(2)}` // คำนวณ VAT 7% จากราคารวม
                : "ค่าบริการ"}
            </span>
          </Box>
        </Typography>
        {/* ค่าธรรมเนียมการชำระเงิน (VAT incl.) */}
        <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderBottom: "1px solid #000", // เส้นขีดใต้ข้อความ
              paddingBottom: "5px", // เพิ่มระยะห่างระหว่างข้อความกับเส้นขีด
              color: "black",
            }}
          >
            <span>ค่าธรรมเนียมการชำระเงิน (VAT incl.)</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${(numericPrice * selectedSeats.length * 0.07 * 1.07) // คำนวณค่าธรรมเนียม 7% บวก VAT 7%
                    .toFixed(2)}`
                : "ค่าธรรมเนียมการชำระเงิน"}
            </span>
          </Box>
        </Typography>
        {/* ราคารวมสุทธิ */}
        <Typography variant="h6" sx={{ mb: 2, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              color: "black",
            }}
          >
            <span>ราคารวมสุทธิ</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${(
                    numericPrice * selectedSeats.length + // ราคารวม
                    numericPrice * selectedSeats.length * 0.07 + // ค่าบริการ (VAT)
                    numericPrice * selectedSeats.length * 0.07 * 1.07
                  ) // ค่าธรรมเนียมการชำระเงิน (VAT)
                    .toFixed(2)}`
                : "ราคารวมสุทธิ"}
            </span>
          </Box>
        </Typography>
      </Box>
      <Button
  variant="contained"
  sx={{
    marginTop: 2,
    borderRadius: 20,
    backgroundColor: "red",
    width: "100%",
    height: 50,
    fontSize: "20px",
    "&:hover": {
      backgroundColor: "#c40d19",
      border: "1px solid white",
    },
  }}
  onClick={() => navigate("/concert/ticket", { state: { price, label, selectedSeats } })}
>
  กดเพื่อแสดงหน้าใบเสร็จ
</Button>

      <Box></Box>
    </Box>
  );
};

export default Payment;
