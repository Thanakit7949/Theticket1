/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // ใช้ useParams สำหรับดึง ID จาก URL
import { Box, Typography, Button } from "@mui/material";

const SportDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ดึง ID จาก URL
  const [sport, setSport] = useState<any>(null); // เก็บข้อมูลกีฬาที่ดึงมา
  const [loading, setLoading] = useState(true); // ใช้เช็คสถานะการโหลดข้อมูล
  const [error, setError] = useState<string | null>(null); // เก็บ error ถ้ามี
  const location = useLocation();
  const sportTest = location.state;
// console.log("Sport details:", sportTest);
  // useEffect(() => {
  //   console.log(id)
  //   const fetchSportDetails = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/getSportDetails/${id}`); // แก้ไข URL ให้ตรงกับ API ที่ให้มา
  //       setSport(response.data); // เก็บข้อมูลที่ได้จาก API
  //     } catch (error) {
  //       setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
  //       console.error(error);
  //     } finally {
  //       setLoading(false); // ตั้งสถานะว่าโหลดเสร็จแล้ว
  //     }
  //   };

  //   fetchSportDetails();
  // }, [id]); // เมื่อเปลี่ยน id ใน URL จะทำการดึงข้อมูลใหม่

  // if (loading) {
  //   return <Typography variant="h6">กำลังโหลดข้อมูล...</Typography>;
  // }

  // if (error) {
  //   return <Typography variant="h6" color="error">{error}</Typography>;
  // }

  // if (!sport) {
  //   return <Typography variant="h6" color="error">ไม่พบข้อมูลกีฬานี้</Typography>;
  // }
 
    // ฟังก์ชันสำหรับกดปุ่ม "ซื้อบัตร"
   
    const handleBuyTicket = () => {
      // ส่งข้อมูลเฉพาะที่ต้องการไปยังหน้า 'stage'
      navigate('stage-sport', { state: sportTest });
      console.log("sportTest:", sportTest);
    };

    useEffect(() => {
      if (!location.state) {
        console.log("ไม่มีข้อมูล state ที่ถูกส่งมา");
      } else {
        console.log("sportTest:", sportTest);
      }
    }, [location.state, sportTest]);
    
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
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {/* Image Section */}
      <Box sx={{ flex: "1 1 auto", mr: 3 }}>
        <img
          src={sportTest.img} // ใช้ข้อมูลจากฐานข้อมูล
          alt={sportTest.name} // ใช้ชื่อจากฐานข้อมูล
          style={{ width: "100%", maxWidth: "300px", borderRadius: "10px" }}
        />
      </Box>

      {/* Details Section */}
      <Box sx={{ flex: "2 1 auto" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="left">
          {sportTest.name} {/* ใช้ชื่อจากฐานข้อมูล */}
        </Typography>
        <Typography variant="body1" color="green" align="left">
          วันที่: {sportTest.date} {/* ใช้วันที่จากฐานข้อมูล */}
        </Typography>
        <Typography variant="body1" color="#2196f3" align="left">
          เวลา: {sportTest.time} {/* ใช้เวลาจากฐานข้อมูล */}
        </Typography>
        <Typography variant="body1" color="blue" align="left">
          สถานที่: {sportTest.location} {/* ใช้สถานที่จากฐานข้อมูล */}
        </Typography>

        {/* Price and Buy Button Box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 25,
            padding: "12px 16px",
            borderRadius: "30px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="black">
            ราคา: ฿{sportTest.price} {/* ใช้ราคา จากฐานข้อมูล */}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: 'red',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '30px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
            onClick={handleBuyTicket}
          >
            ซื้อบัตร
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SportDetail;
