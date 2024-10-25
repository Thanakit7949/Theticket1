import { Box, Card, Typography, Button, CardMedia } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // สำหรับการใช้งาน Link

export interface IHomeTestProps {}
export interface IConcert {
    id: number;
    name: string;
    description: string;
    date: string; // You might want to use Date type if you're working with Date objects
    location: string;
    price: string; // Consider using number if price should be treated as a numeric value
    available_seats: number;
    image: string;
    created_at: string; // Similar to date, this could be a Date type
    concert_id: number ;
  }

  const concertsMock = [
    { id: 1, name: 'Concert 1', date: '2024-11-01T17:00:00.000Z', location: 'New York', image: 'https://via.placeholder.com/350x150' },
    { id: 2, name: 'Concert 2', date: '2024-12-01T17:00:00.000Z', location: 'Los Angeles', image: 'https://via.placeholder.com/350x150' },
    { id: 3, name: 'Concert 3', date: '2024-12-15T17:00:00.000Z', location: 'Chicago', image: 'https://via.placeholder.com/350x150' }
  ];
  
const HomeTest: React.FunctionComponent<IHomeTestProps> = props => {
  const [dataconcerts, setDataconcerts] = useState<IConcert[]>([]); // ใช้ any[] เพื่อเก็บข้อมูลคอนเสิร์ต

  // ฟังก์ชันดึงข้อมูลคอนเสิร์ต
  const fetchConcerts = async () => {
    try {
      const response = await fetch('http://localhost:5000/getAllConcerts'); // เปลี่ยน URL ตามที่คุณใช้
      const dataCon = await response.json();
      setDataconcerts(dataCon); // ตั้งค่าข้อมูลที่ดึงได้ลงใน state
      console.log(dataCon)
    } catch (error) {
      console.error('Error fetching concerts:', error);
    }
  };

  useEffect(() => {
    fetchConcerts(); // เรียกใช้ฟังก์ชันดึงข้อมูลเมื่อคอมโพเนนต์ถูกเรนเดอร์
  }, []);

  const openModal = (concert: any) => {
    console.log(concert); // แสดงข้อมูลของ concert นั้นเมื่อคลิก
  }

  return (
    <Box p={3} bgcolor="gray.800" color="white" borderRadius={2} boxShadow={3} border={1} borderColor="gray.700">
      {/* Concerts Section */}
      <Typography variant="h2" fontWeight="bold" textAlign="center" gutterBottom sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', left: 0, top: -40, fontSize: '4rem', color: 'pink' }}>🎤</Box>
        Upcoming Concerts
        <Box sx={{ position: 'absolute', right: 0, top: -40, fontSize: '4rem', color: 'pink' }}>🎶</Box>
      </Typography>

      <Box display="flex" overflow="auto" gap={2} p={2}>
        {dataconcerts.map((concert) => ( // ใช้ dataconcerts ที่ได้จาก API
          <Card
            key={concert.id}
            sx={{
              bgcolor: "white",
              color: "black",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              '&:hover': { transform: "scale(1.05)", boxShadow: 6 },
              cursor: "pointer",
              minWidth: 350,
              height: 400,
            }}
            onClick={() => openModal(concert)}
          >
            <CardMedia
              component="img"
              height="150"
              image={concert.image}
              alt={concert.name}
              sx={{ borderRadius: 2, mb: 2 }}
            />
            <Typography variant="h3" fontWeight="bold" color="pink.500" gutterBottom>
              {concert.name}
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="pink.500" gutterBottom>
            {dayjs(concert.date).format('DD/MM/YY')}
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body2" color="gray">
                {concert.price}
              </Typography>
              <Typography variant="body2" sx={{ color: 'red' }}>
                {concert.location}
              </Typography>
            </Box>
            <Button
              component={Link}
              to={`/booking/${concert.id}`}
              variant="contained"
              color="secondary"
              sx={{ mt: 'auto', bgcolor: 'pink.500', '&:hover': { bgcolor: 'pink.400' } }}
            >
              Book Now
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HomeTest;
