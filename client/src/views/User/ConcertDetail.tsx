import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // นำเข้า useNavigate
import { Box, Typography, Button } from '@mui/material';

const ConcertDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // สร้างฟังก์ชัน navigate
  const concert = location.state; // รับข้อมูลจากหน้าเดิมที่ถูกส่งมา

  // ฟังก์ชันสำหรับกดปุ่ม "ซื้อบัตร"
  const handleBuyTicket = () => {
    navigate('stage'); // ไปที่หน้า 'stage'
  };

  return (
    <Box
      p={3}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        borderRadius: '20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        background: 'linear-gradient(135deg, #FFC0CB, #B19CD9)',
        color: 'black',
        maxWidth: '800px', // ขนาดกรอบใหญ่ขึ้น
        margin: 'auto',
      }}
    >
      {/* ส่วนของรูปภาพ */}
      <Box sx={{ flex: '1 1 auto', mr: 3 }}>
        <img
          src={concert.image}
          alt={concert.title}
          style={{ width: '100%', maxWidth: '300px', borderRadius: '10px' }} // รูปใหญ่ขึ้น
        />
      </Box>

      {/* ส่วนของรายละเอียด */}
      <Box sx={{ flex: '2 1 auto' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="left">
          {concert.title}
        </Typography>
        <Typography variant="body1" color="green" align="left">
          วันที่: {concert.date}
        </Typography>
        <Typography variant="body1" color="#2196f3" align="left">
          เวลา: {concert.time}
        </Typography>
        <Typography variant="body1" color="blue" align="left">
          สถานที่: {concert.location}
        </Typography>

        {/* ส่วนของราคาและปุ่มซื้อ */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 22, // เพิ่มค่า mt ให้มากขึ้นเพื่อลงไปข้างล่างอีก
            padding: '12px 16px',
            borderRadius: '30px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="black">
            ราคาเริ่มต้น: ฿{concert.price}
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
            onClick={handleBuyTicket} // เมื่อคลิกปุ่มจะเรียกใช้ฟังก์ชัน handleBuyTicket
          >
            ซื้อบัตร
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConcertDetail;