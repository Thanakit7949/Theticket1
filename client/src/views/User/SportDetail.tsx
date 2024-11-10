import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const SportDetail: React.FC = () => {
  const location = useLocation();
  const sport = location.state; // รับข้อมูลจากหน้าเดิมที่ถูกส่งมา

  return (
    <Box
      p={3}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        borderRadius: "20px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        background: 'linear-gradient(135deg, #FFC0CB, #B19CD9)',
        color: "black",
        maxWidth: "800px", // ขนาดกรอบใหญ่ขึ้น
        margin: "auto",
      }}
    >
      {/* Image Section */}
      <Box sx={{ flex: "1 1 auto", mr: 3 }}>
        <img
          src={sport.img}
          alt={sport.title}
          style={{ width: "100%", maxWidth: "300px", borderRadius: "10px" }} // รูปใหญ่ขึ้น
        />
      </Box>

      {/* Details Section */}
      <Box sx={{ flex: "2 1 auto" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="left">
          {sport.title}
        </Typography>
        <Typography variant="body1" color="green" align="left">
          วันที่: {sport.date}
        </Typography>
        <Typography variant="body1" color="#2196f3" align="left">
          เวลา: {sport.time}
        </Typography>
        <Typography variant="body1" color="blue" align="left">
          สถานที่: {sport.location}
        </Typography>

        {/* Price and Buy Button Box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 25, // เพิ่มค่า mt ให้มากขึ้นเพื่อลงไปข้างล่างอีก
            padding: "12px 16px",
            borderRadius: "30px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="black">
            ราคาเริ่มต้น: ฿{sport.price}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              padding: "8px 16px",
              borderRadius: "30px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            ซื้อบัตร
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SportDetail;
