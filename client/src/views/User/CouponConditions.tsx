import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom
import Coupon from "/src/assets/promotion/pp.webp";

const CouponPage: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* รูปภาพ Coupon */}
      <Box
        component="img"
        src={Coupon}
        alt="Bus Because of You I Shine"
        sx={{
          width: "100%",
          maxWidth: "1100px",
          height: "auto",
          marginTop: 2,
          borderRadius: 2,
        }}
      />

      {/* ลิงก์กลับไปหน้า home-user */}
      <Link to="/home-user" style={{ textDecoration: "none" }}>
        {" "}
        {/* ลิงค์ไปที่ home-user */}
        <Box
          sx={{
            width: "100%", // ทำให้กล่องกว้างเต็มที่ตามคอนเทนเนอร์
            maxWidth: "500px", // หรือกำหนดความกว้างสูงสุดตามที่คุณต้องการ
            marginTop: 4,
            padding: 2,
            borderRadius: "30px",
            border: "2px solid #f57c00", // สีกรอบเป็นสีเขียวพาสเทล
            backgroundColor: "#fff3e0", // สีพื้นหลัง
            transition: "background-color 0.3s", // เพิ่มการเปลี่ยนแปลงสี
            "&:hover": {
              backgroundColor: "#ffd180", // สีเมื่อเมาส์ไปโดน
            },
          }}
        >
          <Typography variant="h6" textAlign="center" sx={{ color: "#ef6c00" }}>
            กลับสู่หน้าหลัก
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default CouponPage;
