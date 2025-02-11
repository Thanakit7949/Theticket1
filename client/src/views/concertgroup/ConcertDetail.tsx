/* eslint-disable @typescript-eslint/no-explicit-any */
import React,{ useEffect, useState }  from 'react';
import { useLocation, useNavigate,useParams} from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const ConcertDetail: React.FC = () => {
  
  const navigate = useNavigate();
  const { id } = useParams(); // ดึง ID จาก URL
  const [concertA, setConcert] = useState<any>(null);
  const [loading, setLoading] = useState(true); // ใช้เช็คสถานะการโหลดข้อมูล
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const concert = location.state;


  // ฟังก์ชันสำหรับกดปุ่ม "ซื้อบัตร"
  const handleBuyTicket = () => {
    // ส่งข้อมูลเฉพาะที่ต้องการไปยังหน้า 'stage'
    // navigate('stage-concert');
    navigate("stage-concert", { state: concert });
    console.log("concert:", concert);
  };

  useEffect(() => {
    if (!location.state) {
      console.log("ไม่มีข้อมูล state ที่ถูกส่งมา");
    } else {
      console.log("concert:", concert);
    }
  }, [location.state, concert]);

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
        maxWidth: '800px',
        margin: 'auto',
      }}
    >
      <Box sx={{ flex: '1 1 auto', mr: 3 }}>
        <img
          src={concert.img}
          alt={concert.name}
          style={{ width: '100%', maxWidth: '300px', borderRadius: '10px' }}
        />
      </Box>
      <Box sx={{ flex: '2 1 auto' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="left">
          {concert.name}
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 22,
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
            onClick={handleBuyTicket}
          >
            ซื้อบัตร
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConcertDetail;
