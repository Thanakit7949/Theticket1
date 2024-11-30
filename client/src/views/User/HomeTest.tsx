/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  Typography,
  Button,
  CardMedia,
  Paper,
  Grid,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // สำหรับการใช้งาน Link
import bas from "/src/assets/home/bas.jpg";
import molly from "/src/assets/home/molly.jpg";
import pop from "/src/assets/home/pop.jpg";
import toy from "/src/assets/home/toy.jpg";
import pur from "/src/assets/home/pur.jpg";
import bbrick from "/src/assets/home/bbrick.jpg";
import labubu from "/src/assets/home/labubu.jpg";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

import "swiper/swiper-bundle.css";


// // Sample Data for Sports Events
// const sportsMock = [
//     { id: 1, name: 'Football Match', date: '2024-11-10T17:00:00.000Z', location: 'Stadium A', image: 'https://via.placeholder.com/350x150' },
//     { id: 2, name: 'Basketball Game', date: '2024-11-20T17:00:00.000Z', location: 'Arena B', image: 'https://via.placeholder.com/350x150' },
//     { id: 3, name: 'Tennis Tournament', date: '2024-12-05T17:00:00.000Z', location: 'Court C', image: 'https://via.placeholder.com/350x150' }
// ];

// const upcomingSportsEvents = [
//     { id: 1, name: 'Football Match', image: 'https://via.placeholder.com/800x300?text=Football+Match' },
//     { id: 2, name: 'Basketball Game', image: 'https://via.placeholder.com/800x300?text=Basketball+Game' },
//     { id: 3, name: 'Tennis Tournament', image: 'https://via.placeholder.com/800x300?text=Tennis+Tournament' },
// ];

export interface IConcert {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  price: string;
  available_seats: number;
  image: string;
  created_at: string;
  concert_id: number;
}
export interface ISports {
  id: number;
  name: string;
  date: string;
  time: string;
  price: string;
  available_seats: number;
  location: string;
  image: string;
  sport_id: number;
}

const HomeTest: React.FunctionComponent = () => {
  const [dataconcerts, setDataconcerts] = useState<IConcert[]>([]);
  const [dataSports, setDataSports] = useState<ISports[]>([]); // Mock data for sports events

  const fetchConcerts = async () => {
    try {
      const response = await fetch("http://localhost:5000/getAllConcerts");
      const dataCon = await response.json();
      setDataconcerts(dataCon);
      console.log(dataCon);
    } catch (error) {
      console.error("Error fetching concerts:", error);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  const openModal = (event: any) => {
    console.log(event);
  };

  const fetchSports = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/getAllSportsFootball"
      );
      const data: ISports[] = await response.json();
      setDataSports(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            padding: 4,
            //backgroundColor: "#f0f4f8", // สีพื้นหลังโทนพาสเทล
            borderRadius: "12px",
          }}
        >
          {/* Concert Button */}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/concert"
            startIcon={<MusicNoteIcon />}
            sx={{
              fontWeight: "bold",
              fontSize: "32px", // ขยายขนาดฟอนต์
              padding: "20px 40px", // ขยายขนาดปุ่ม
              background: "linear-gradient(135deg, #FFB6C1, #FF69B4)", // Gradient สีพาสเทล
              color: "#fff",
              borderRadius: "25px", // ขอบมน
              boxShadow: "0 6px 12px rgba(255, 182, 193, 0.5)",
              transition: "0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(135deg, #FF69B4, #FF1493)", // เปลี่ยน Gradient เมื่อ hover
                transform: "scale(1.1) rotate(-2deg)", // ขยายและหมุนเมื่อ hover
                boxShadow: "0 8px 20px rgba(255, 105, 180, 0.7)",
              },
            }}
          >
            Concert
          </Button>

          {/* Sport Button */}
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/sport"
            startIcon={<SportsSoccerIcon />}
            sx={{
              fontWeight: "bold",
              fontSize: "32px",
              padding: "20px 40px",
              background: "linear-gradient(135deg, #B2DFDB, #4DB6AC)", // Gradient สีพาสเทล
              color: "#fff",
              borderRadius: "25px",
              boxShadow: "0 6px 12px rgba(178, 223, 219, 0.5)",
              transition: "0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(135deg, #4DB6AC, #004D40)", // เปลี่ยน Gradient เมื่อ hover
                transform: "scale(1.1) rotate(2deg)", // ขยายและหมุนเมื่อ hover
                boxShadow: "0 8px 20px rgba(0, 77, 64, 0.7)",
              },
            }}
          >
            Sport
          </Button>
        </Box>

        {/* Concerts Section */}
        <Box
          p={3}
          sx={{
            background: "linear-gradient(to right, #FDF6B6, #A0D3E8)", // กำหนดสีพื้นหลังที่ต้องการ
            color: "black",
            borderRadius: "25px",
            boxShadow: 3,
            border: 2,
            borderColor: "gray.700",
            width: "102%",
            maxWidth: "1200px",
            mx: "auto",
            mt: 2,
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{
              position: "relative",
              backgroundColor: "#e0f2f1", // พื้นหลังให้ข้อความ
              padding: "20px 30px", // เพิ่ม padding
              borderRadius: 2, // มุมโค้ง
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // เงาให้ข้อความ
              letterSpacing: 2, // เพิ่มระยะห่างระหว่างตัวอักษร
              textShadow: "1px 1px 3px rgba(255, 105, 180, 0.6)", // เงาข้อความ
              color: "#2A505A", // สีข้อความที่สดใส
              fontSize: "3rem", // ขนาดตัวอักษรใหญ่ขึ้น
              border: "5px solid #8BD2EC",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: -40,
                fontSize: "4rem",
                color: "pink",
              }}
            >
              🎤
            </Box>
            Upcoming Concerts
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: -40,
                fontSize: "4rem",
                color: "pink",
              }}
            >
              🎶
            </Box>
          </Typography>

          <Box display="flex" overflow="auto" gap={2} p={2}>
            {dataconcerts.map((concert) => (
              <Card
                key={concert.id}
                sx={{
                  bgcolor: "#eceff1",
                  color: "black",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                  cursor: "pointer",
                  minWidth: 350,
                  height: 450,
                }}
                onClick={() => openModal(concert)}
              >
                <CardMedia
                  component="img"
                  height="230"
                  image={`http://localhost/concert/all/${concert.image}`}
                  alt={concert.name}
                  sx={{ borderRadius: 2, mb: 2 }}
                />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="pink.500"
                  gutterBottom
                >
                  {concert.name}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="pink.500"
                  gutterBottom
                >
                  {dayjs(concert.date).format("DD/MM/YY")}
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2" color="gray">
                    {concert.price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "red" }}>
                    {concert.location}
                  </Typography>
                </Box>

                <Button
                  component={Link}
                  to={`/booking/${concert.id}`}
                  variant="contained"
                  color="secondary"
                  sx={{
                    mt: "auto",
                    bgcolor: "#FF6699",
                    "&:hover": { bgcolor: "black" },
                  }}
                >
                  Book Now
                </Button>
              </Card>
            ))}
          </Box>

          {/* View All Concerts Button */}
          <Box textAlign="center" mt={3}>
            <Button
              component={Link}
              to="" // เปลี่ยนเป็น URL ของหน้าที่จะแสดงคอนเสิร์ตทั้งหมด
              variant="outlined"
              color="secondary"
              sx={{
                bgcolor: "#FFFFE0", // เปลี่ยนเป็นสีสดใสขึ้น
                color: "#CD853F", // เปลี่ยนสีตัวอักษรเป็นสีขาวเพื่อให้ตัดกับพื้นหลัง
                fontSize: "1.2rem", // ขยายขนาดตัวอักษร
                fontWeight: "bold",
                border: "2px solid #F4A460",
                px: 6, // เพิ่ม padding แนวนอน
                py: 2, // เพิ่ม padding แนวตั้ง
                borderRadius: 3, // เพิ่มความโค้งมนให้ปุ่มมากขึ้น
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)", // เพิ่มเงาให้ชัดเจนขึ้น
                transition: "all 0.4s ease", // เพิ่มเวลาและการเปลี่ยนแปลงนุ่มนวลยิ่งขึ้น
                transform: "scale(1.1)", // ขยายปุ่มให้ดูเด่นขึ้น
                "&:hover": {
                  bgcolor: "linear-gradient(45deg, #FF8C00, #FFA500)", // เปลี่ยนสีเมื่อ hover
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)", // เพิ่มเงาตอน hover
                  transform: "scale(1.15)", // ขยายปุ่มเล็กน้อยตอน hover
                  border: "2px solid #12cad6",
                },
              }}
            >
              View All Concerts
            </Button>
          </Box>
        </Box>
        <Box
          p={3}
          sx={{
            background: "linear-gradient(to right, #FFE5B4, #C6D9E9)", // สีพื้นหลังที่สดใส
            color: "black",
            borderRadius: "25px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // เงาที่เด่นชัด
            width: "102%",
            maxWidth: "1200px",
            mx: "auto",
            mt: 5,
            border: 2,
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{
              position: "relative",
              backgroundColor: "#FEE5E0", // พื้นหลังให้ข้อความ
              padding: "20px 30px", // เพิ่ม padding
              borderRadius: 2, // มุมโค้ง
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // เงาให้ข้อความ
              letterSpacing: 2, // เพิ่มระยะห่างระหว่างตัวอักษร
              textShadow: "1px 1px 3px rgba(255, 105, 180, 0.6)", // เงาข้อความ
              color: "#D83D8D", // สีข้อความที่สดใส
              fontSize: "3rem", // ขนาดตัวอักษรใหญ่ขึ้น
              border: "5px solid #F898A4",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: -40,
                fontSize: "4rem",
                color: "pink",
              }}
            >
              🏆
            </Box>
            Upcoming Sports Events
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: -40,
                fontSize: "4rem",
                color: "pink",
              }}
            >
              ⚽
            </Box>
          </Typography>

          <Box display="flex" overflow="auto" gap={2} p={2}>
            {dataSports.map((sport) => (
              <Card
                key={sport.id}
                sx={{
                  bgcolor: "white",
                  color: "black",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                  cursor: "pointer",
                  minWidth: 350,
                  height: 430,
                }}
                onClick={() => openModal(sport)}
              >
                <CardMedia
                  component="img"
                  height="210"
                  src={`http://localhost/sport/all/${sport.image}`}
                  alt={sport.name}
                  sx={{ borderRadius: 2, mb: 2 }}
                />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="blue.700"
                  gutterBottom
                >
                  {sport.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {dayjs(sport.date).format("DD/MM/YY")}
                </Typography>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2" color="gray">
                    {sport.price ? `${sport.price} THB` : "Free"}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {sport.location}
                  </Typography>
                </Box>

                <Button
                  component={Link}
                  to={`/booking/${sport.id}`}
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: "auto",
                    bgcolor: "#1976d2",
                    "&:hover": { bgcolor: "#1565c0" },
                  }}
                >
                  Book Now
                </Button>
              </Card>
            ))}
          </Box>
          <Box textAlign="center" mt={3}>
            <Button
              component={Link}
              to="" // Change to the URL of the page showing all sports events
              variant="contained" // ใช้แบบ contained
              sx={{
                bgcolor: "#f8bbd0", // สีพื้นหลังพาสเทล (ชมพูอ่อน)
                color: "#e91e63", // สีข้อความ (เทาเข้ม)
                borderRadius: "30px", // มุมของปุ่มโค้งมน
                padding: "12px 28px", // เพิ่ม padding ให้ปุ่มใหญ่ขึ้น
                fontSize: "1.2rem", // ขนาดฟอนต์
                fontWeight: "bold", // ตัวหนา
                textTransform: "uppercase", // ตัวพิมพ์ใหญ่ทั้งหมด
                letterSpacing: "1px", // ช่องว่างระหว่างตัวอักษร
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", // เงาที่นุ่มนวล
                transition: "background-color 0.3s, transform 0.2s", // เพิ่ม transition
                "&:hover": {
                  bgcolor: "#f48fb1", // เปลี่ยนสีเมื่อ hover
                  transform: "scale(1.05)", // ขยายขนาดเมื่อ hover
                  color: "#FFFFFF",
                },
                "&:active": {
                  bgcolor: "#f48fb1", // สีเมื่อกดปุ่ม
                },
              }}
            >
              <span style={{ marginRight: "8px" }}>🏆</span> {/* เพิ่มไอคอน */}
              View All Sports Events
            </Button>
          </Box>
          
        </Box>
        <Box
          p={4}
          sx={{
            background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)", // พื้นหลังพาสเทลไล่สี
            color: "black",
            borderRadius: "25px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // เงานุ่มๆให้ดูละมุน
            width: "100%",
            maxWidth: "1300px",
            mx: "auto",
            mt: 6,
            position: "relative",
            border: 2,
          }}
        >
          <Typography
            variant="h2"
            fontWeight="700"
            textAlign="center"
            gutterBottom
            sx={{
              backgroundColor: "#F5E8F7", // พื้นหลังโปร่งใสเล็กน้อย
              padding: "25px 35px",
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // เงานุ่มให้ข้อความ
              letterSpacing: 2,
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.15)", // เงาข้อความบางๆ
              color: "#9c27b0", // สีข้อความพาสเทลอ่อนๆ
              fontSize: "3rem", // ขนาดตัวอักษรใหญ่พอเหมาะ
              position: "relative",
              border: "5px solid #DBCDE3",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: -40,
                top: -40,
                fontSize: "4rem",
                color: "#FFB6C1", // สีไอคอนพาสเทล
                transform: "rotate(-15deg)", // บิดไอคอนซ้าย
                filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))", // เงาให้ไอคอนเบาๆ
              }}
            ></Box>
            📖 INFORMATION 📚
            <Box
              sx={{
                position: "absolute",
                right: -40,
                top: -40,
                fontSize: "4rem",
                color: "#B0E0E6", // สีไอคอนพาสเทล
                transform: "rotate(15deg)", // บิดไอคอนขวา
                filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))", // เงาให้ไอคอนเบาๆ
              }}
            ></Box>
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: "1000px",
              height: "auto",
              margin: "0 auto",
              border: "10px solid #e3e3e3",
              borderRadius: "20px",
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              overflow: "hidden",
              p: 4,
            }}
          >
            {/* Header (Optional for enhancing appearance) */}
            <Typography
              variant="h3"
              align="center"
              color="primary"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "2px",
                mb: 4,
                background: "linear-gradient(to right, #3f51b5, #1e88e5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            ></Typography>

            {/* Row for Page 1 and Page 2 */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            >
              {/* Left Page - Page 1 */}
              <Paper
                sx={{
                  p: 4,
                  width: "48%",
                  borderRadius: "15px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.3)",
                  },
                  background:
                    "linear-gradient(to bottom right, #f3f3f3, #e0e0e0)",
                }}
              >
                <Typography variant="h4" color="primary" gutterBottom>
                  Page 1: Introduction
                </Typography>
                <Typography variant="body1" paragraph>
                  Welcome to the Virtual Book for Sports Events! Explore all the
                  exciting sports events happening around the world on the
                  following pages.
                </Typography>
              </Paper>

              {/* Right Page - Page 2 */}
              <Paper
                sx={{
                  p: 4,
                  width: "48%",
                  borderRadius: "15px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.3)",
                  },
                  background:
                    "linear-gradient(to bottom right, #f3f3f3, #e0e0e0)",
                  ml: "40px",
                }}
              >
                <Typography variant="h4" color="primary" gutterBottom>
                  Page 2: Sports Event 1
                </Typography>
                <Typography variant="body1" paragraph>
                  Details about the first sports event. Discover more about it
                  and dive into the experience.
                </Typography>
              </Paper>
            </Box>

            {/* Row for Page 3 and Page 4 */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 8 }}
            >
              {/* Left Page - Page 3 */}
              <Paper
                sx={{
                  p: 4,
                  width: "48%",
                  borderRadius: "15px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.3)",
                  },
                  background:
                    "linear-gradient(to bottom right, #f3f3f3, #e0e0e0)",
                }}
              >
                <Typography variant="h4" color="primary" gutterBottom>
                  Page 3: Sports Event 2
                </Typography>
                <Typography variant="body1" paragraph>
                  Learn about the second exciting sports event that will take
                  place. Find out more about the event.
                </Typography>
              </Paper>

              {/* Right Page - Page 4 */}
              <Paper
                sx={{
                  p: 4,
                  width: "48%",
                  borderRadius: "15px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.3)",
                  },
                  background:
                    "linear-gradient(to bottom right, #f3f3f3, #e0e0e0)",
                  ml: "40px",
                }}
              >
                <Typography variant="h4" color="primary" gutterBottom>
                  Page 4: Sports Event 3
                </Typography>
                <Typography variant="body1" paragraph>
                  Get ready for the third major sports event. This is one you
                  don’t want to miss!
                </Typography>
              </Paper>
            </Box>

            {/* Pagination or next page button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  fontSize: "1.2rem",
                  px: 4,
                  py: 1.5,
                  borderRadius: "50px",
                  background: "linear-gradient(to right, #ff4081, #f50057)",
                  boxShadow: "0px 10px 20px rgba(245, 0, 87, 0.4)",
                  transition:
                    "transform 0.3s, background 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    background: "linear-gradient(to right, #f50057, #c51162)",
                    boxShadow: "0px 15px 30px rgba(197, 17, 98, 0.5)",
                    transform: "scale(1.05)", // ทำให้ปุ่มขยายเมื่อวางเมาส์
                    color: "#F8E8D3",
                  },
                  "&:active": {
                    transform: "scale(0.95)", // ทำให้ปุ่มหดตัวเมื่อกด
                    boxShadow: "0px 10px 20px rgba(197, 17, 98, 0.3)",
                  },
                }}
                component={Link}
                to=""
              >
                Go to Next Page
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          p={4}
          sx={{
            background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)", // พื้นหลังพาสเทลไล่สี
            color: "black",
            borderRadius: "25px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // เงานุ่มๆให้ดูละมุน
            width: "100%",
            maxWidth: "1300px",
            mx: "auto",
            mt: 6,
            position: "relative",
            border: 2,
          }}
        >
          <Box sx={{ position: "relative", textAlign: "center", mb: 5 }}>
            <Typography
              variant="h2"
              fontWeight="700"
              gutterBottom
              sx={{
                background: "linear-gradient(to right, #FAD0C4, #FFD1FF)", // Soft pastel gradient background
                padding: "40px 60px", // Increased padding for spacious feel
                borderRadius: "20px", // Rounded corners for a softer look
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
                letterSpacing: 2,
                color: "#6B5B95", // Darker pastel text color
                fontSize: "3rem", // Large font size
                position: "relative",
                zIndex: 1, // Ensure text is above the background elements
                border: "5px solid #6B5B95",
              }}
            >
              👜 Our Exclusive Products🧸
            </Typography>
            <Grid container spacing={4}>
              {/* Product Card 1 */}
              <Grid item xs={12} sm={6} lg={4}>
                <Box
                  sx={{
                    bgcolor: "#EBECE7",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 192,
                      bgcolor: "#e0f7fa",
                      borderRadius: 2,
                      mb: 2,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={pur}
                      alt="Product 1"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#4A4A4A" }}
                  >
                    Product 1
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    This is a premium product offering high quality and
                    excellent performance.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#ffccbc",
                      color: "#fff",
                      "&:hover": { bgcolor: "#ffab91" },
                      fontWeight: "bold",
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Grid>

              {/* Product Card 2 */}
              <Grid item xs={12} sm={6} lg={4}>
                <Box
                  sx={{
                    bgcolor: "#EBECE7",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 192,
                      bgcolor: "#e0f7fa",
                      borderRadius: 2,
                      mb: 2,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={toy}
                      alt="Product 2"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#4A4A4A" }}
                  >
                    Product 2
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Experience the best with our top-rated product that
                    guarantees satisfaction.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#ffccbc",
                      color: "#fff",
                      "&:hover": { bgcolor: "#ffab91" },
                      fontWeight: "bold",
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Grid>

              {/* Product Card 3 */}
              <Grid item xs={12} sm={6} lg={4}>
                <Box
                  sx={{
                    bgcolor: "#EBECE7",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 192,
                      bgcolor: "#e0f7fa",
                      borderRadius: 2,
                      mb: 2,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={molly}
                      alt="Product 3"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#4A4A4A" }}
                  >
                    Product 3
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Crafted to perfection, this product provides durability and
                    superior quality.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#ffccbc",
                      color: "#fff",
                      "&:hover": { bgcolor: "#ffab91" },
                      fontWeight: "bold",
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Grid>

              {/* Product Card 4 */}
              <Grid item xs={12} sm={6} lg={4}>
                <Box
                  sx={{
                    bgcolor: "#EBECE7",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 192,
                      bgcolor: "#e0f7fa",
                      borderRadius: 2,
                      mb: 2,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={labubu}
                      alt="Product 4"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#4A4A4A" }}
                  >
                    Product 4
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    This is a premium product offering high quality and
                    excellent performance.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#ffccbc",
                      color: "#fff",
                      "&:hover": { bgcolor: "#ffab91" },
                      fontWeight: "bold",
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Grid>

              {/* Product Card 5 */}
              <Grid item xs={12} sm={6} lg={4}>
                <Box
                  sx={{
                    bgcolor: "#EBECE7",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 192,
                      bgcolor: "#e0f7fa",
                      borderRadius: 2,
                      mb: 2,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={bbrick}
                      alt="Product 5"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#4A4A4A" }}
                  >
                    Product 5
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Experience the best with our top-rated product that
                    guarantees satisfaction.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#ffccbc",
                      color: "#fff",
                      "&:hover": { bgcolor: "#ffab91" },
                      fontWeight: "bold",
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Grid>

              {/* Product Card 6 */}
              <Grid item xs={12} sm={6} lg={4}>
                <Box
                  sx={{
                    bgcolor: "#EBECE7",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 192,
                      bgcolor: "#e0f7fa",
                      borderRadius: 2,
                      mb: 2,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={pop}
                      alt="Product 6"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#4A4A4A" }}
                  >
                    Product 6
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Crafted to perfection, this product provides durability and
                    superior quality.
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#ffccbc",
                      color: "#fff",
                      "&:hover": { bgcolor: "#ffab91" },
                      fontWeight: "bold",
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  fontSize: "1.2rem",
                  px: 4,
                  py: 1.5,
                  borderRadius: "50px",
                  background: "linear-gradient(to right, #ffd1dc, #ff9e80)",
                  boxShadow: "0px 8px 16px rgba(255, 158, 128, 0.3)",
                  transition:
                    "transform 0.3s, background 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    background: "linear-gradient(to right, #ff9e80, #ff6e40)",
                    boxShadow: "0px 12px 24px rgba(255, 110, 64, 0.4)",
                    transform: "translateY(-3px)",
                    color: "#656C5C",
                  },
                  "&:active": {
                    transform: "translateY(1px)",
                    boxShadow: "0px 8px 16px rgba(255, 110, 64, 0.2)",
                  },
                }}
                component={Link}
                to=""
              >
                Go to Next Page
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          p={3}
          sx={{
            background: "linear-gradient(135deg, #FDEBD3 0%, #A7D7C5 100%)", // ไล่สีพาสเทลอ่อนๆ
            color: "#5A5A5A",
            borderRadius: "25px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)", // เงาที่นุ่มนวลขึ้น
            width: "102%",
            maxWidth: "1200px",
            mx: "auto",
            mt: 5,
            position: "relative",
            overflow: "hidden",
            border: "2px solid #171717",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              left: "20px",
              width: "100px",
              height: "100px",
              background: "rgba(255, 255, 255, 0.5)",
              borderRadius: "50%",
              zIndex: 1,
              filter: "blur(10px)",
            }}
          />
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 5,
              p: 4,
              backgroundColor: "#F0FFF0", // พื้นหลังสีเขียวอ่อนแบบพาสเทล
              borderRadius: "25px",
              width: "100%",
              maxWidth: "1000px",
              mx: "auto",
              boxShadow: "0 15px 25px rgba(0, 128, 0, 0.15)", // เพิ่มเงาสีเขียวอ่อนเพื่อความนุ่มนวล
              overflow: "hidden",
              border: "5px solid #3CB371",
            }}
          >
            {/* วงกลมแสงพื้นหลัง */}
            <Box
              sx={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                width: "150px",
                height: "150px",
                background: "rgba(255, 228, 225, 0.6)", // สีชมพูอ่อนแบบโกลว์
                borderRadius: "50%",
                filter: "blur(30px)",
                zIndex: 1,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                width: "150px",
                height: "150px",
                background: "rgba(173, 216, 230, 0.6)", // สีฟ้าอ่อนแบบโกลว์
                borderRadius: "50%",
                filter: "blur(30px)",
                zIndex: 1,
              }}
            />

            {/* Icon ที่เป็นแสงระยิบระยับ */}
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                left: "10%",
                fontSize: "2.5rem",
                color: "#FF69B4",
                zIndex: 2,
              }}
            >
              ✨
            </Box>

            {/* Icon ที่เป็นแสงระยิบระยับอีกด้าน */}
            <Box
              sx={{
                position: "absolute",
                bottom: "10%",
                right: "10%",
                fontSize: "2.5rem",
                color: "#FFD700",
                zIndex: 2,
              }}
            >
              🌟
            </Box>

            {/* ข้อความหลัก */}
            <Typography
              variant="h3"
              fontWeight="bold"
              textAlign="center"
              sx={{
                position: "relative",
                padding: "20px 35px",
                letterSpacing: "1.5px",
                color: "#008000", // สีตัวอักษรเขียวเข้ม
                fontSize: "3rem",
                zIndex: 3,
              }}
            >
              Exclusive Promotion
            </Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              right: -60,
              top: -20,
              fontSize: "3rem",
              color: "#87CEEB", // สีฟ้าอ่อนพาสเทล
              zIndex: 2,
            }}
          ></Box>

          <Box
            mt={4}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#FFEBF0", // สีพาสเทลชมพู
                padding: "20px",
                borderRadius: "15px",
                width: "900px",
                boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)", // ขยายเล็กน้อยเมื่อ hover
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                sx={{
                  color: "#FF69B4", // สีหัวข้อ
                  mb: 2, // ระยะห่างด้านล่างของหัวข้อ
                }}
              >
                Special Offer
              </Typography>

              <Box
                sx={{
                  backgroundImage: `url(${bas})`, // URL รูปภาพ
                  backgroundSize: "cover", // ปรับขนาดภาพให้เต็มกล่อง
                  borderRadius: "10px",
                  height: "180px", // ความสูงของกล่องรูปภาพ
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2, // ระยะห่างด้านล่างของกล่องรูปภาพ
                }}
              ></Box>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF69B4", // สีปุ่ม
                  color: "#FFFFFF", // สีตัวอักษรของปุ่ม
                  "&:hover": {
                    backgroundColor: "#FF1493", // สีปุ่มเมื่อ hover
                  },
                }}
              >
                Shop Now
              </Button>
            </Box>
            <Box
              mt={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#DFF6FF", // สีพาสเทลฟ้า
                  padding: "20px",
                  borderRadius: "15px",
                  width: "900px",
                  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // ขยายเล็กน้อยเมื่อ hover
                  },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  textAlign="center"
                  sx={{
                    color: "#00BFFF", // สีหัวข้อ
                    mb: 2, // ระยะห่างด้านล่างของหัวข้อ
                  }}
                >
                  50% Off!
                </Typography>

                <Box
                  sx={{
                    backgroundImage: `url(${bas})`, // URL รูปภาพ (สามารถเปลี่ยนเป็นรูปที่ต้องการได้)
                    backgroundSize: "cover", // ปรับขนาดภาพให้เต็มกล่อง
                    borderRadius: "10px",
                    height: "180px", // ความสูงของกล่องรูปภาพ
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2, // ระยะห่างด้านล่างของกล่องรูปภาพ
                  }}
                >
                  {/* สามารถใส่เนื้อหาหรือข้อความเพิ่มเติมที่นี่ */}
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#00BFFF", // สีปุ่ม
                    color: "#FFFFFF", // สีตัวอักษรของปุ่ม
                    "&:hover": {
                      backgroundColor: "#009ACD", // สีปุ่มเมื่อ hover
                    },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
            </Box>

            <Box
              mt={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#F0FFF0", // สีพาสเทลเขียว
                  padding: "20px",
                  borderRadius: "15px",
                  width: "900px",
                  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)", // ขยายเล็กน้อยเมื่อ hover
                  },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  textAlign="center"
                  sx={{
                    color: "#32CD32", // สีหัวข้อ
                    mb: 2, // ระยะห่างด้านล่างของหัวข้อ
                  }}
                >
                  Buy 1 Get 1!
                </Typography>

                <Box
                  sx={{
                    backgroundImage: `url(${bas})`, // URL รูปภาพ (สามารถเปลี่ยนเป็นรูปที่ต้องการได้)
                    backgroundSize: "cover", // ปรับขนาดภาพให้เต็มกล่อง
                    borderRadius: "10px",
                    height: "180px", // ความสูงของกล่องรูปภาพ
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2, // ระยะห่างด้านล่างของกล่องรูปภาพ
                  }}
                >
                  {/* สามารถใส่เนื้อหาหรือข้อความเพิ่มเติมที่นี่ */}
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#32CD32", // สีปุ่ม
                    color: "#FFFFFF", // สีตัวอักษรของปุ่ม
                    "&:hover": {
                      backgroundColor: "#28A745", // สีปุ่มเมื่อ hover
                    },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                fontSize: "1.2rem",
                px: 4,
                py: 1.5,
                borderRadius: "50px",
                background: "linear-gradient(to right, #ffd1dc, #ff9e80)",
                boxShadow: "0px 8px 16px rgba(255, 158, 128, 0.3)",
                transition: "transform 0.3s, background 0.3s, box-shadow 0.3s",
                "&:hover": {
                  background: "linear-gradient(to right, #ff9e80, #ff6e40)",
                  boxShadow: "0px 12px 24px rgba(255, 110, 64, 0.4)",
                  transform: "translateY(-3px)",
                  color: "#656C5C",
                },
                "&:active": {
                  transform: "translateY(1px)",
                  boxShadow: "0px 8px 16px rgba(255, 110, 64, 0.2)",
                },
              }}
              component={Link}
              to=""
            >
              Go to Next Page
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomeTest;
