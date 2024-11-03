import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ConcertImage1 from "/src/assets/concert/con3.jpg";
import ConcertImage2 from "/src/assets/concert/con4.webp";
import ConcertImage3 from "/src/assets/concert/conn.jpg";
import ConcertImage4 from "/src/assets/concert/con2.webp";
import Bus from "/src/assets/concert/bus.png";
import Got7 from "/src/assets/concert/got7.jpg";
import Enhypen from "/src/assets/concert/en.jpg";
import Pixxie from "/src/assets/concert/pixxie.jpg";
import Lykn from "/src/assets/concert/lykn.jpg";
import Gif from "/src/assets/concert/con5.gif";
import Gif1 from "/src/assets/concert/gif2.gif";
import Gif2 from "/src/assets/concert/_on.gif";
import Gif3 from "/src/assets/concert/gif4.gif";
import cImage from "/src/assets/concert/all/c.png";
import c1Image from "/src/assets/concert/all/c1.jpg";
import c2Image from "/src/assets/concert/all/c2.jpg";
import c3Image from "/src/assets/concert/all/c3.jpg";
import c4Image from "/src/assets/concert/all/c4.jpg";
import c5Image from "/src/assets/concert/all/c5.jpg";
import c6Image from "/src/assets/concert/all/c6.jpg";
import c7Image from "/src/assets/concert/all/c7.jpg";
import c8Image from "/src/assets/concert/all/c8.png";
import c9Image from "/src/assets/concert/all/c9.png";
import c10Image from "/src/assets/concert/all/c10.png";
import c11Image from "/src/assets/concert/all/c11.png";
import ConcertDetailPage from "./ConcDetail";

export interface IDataConcert {
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price:number
}
const Concert: React.FC = () => {
  const navigate = useNavigate();
  const [dataconcert, setDataconcert] = useState<IDataConcert>();
  const handleBuyTicket = (item: {
    image: string;
    title: string;
    date: string;
    time: string;
    location: string;
    price:number
  }) => {
    // setDataconcert(item)
    navigate("concert-detail", { state: item });
  };

  const images = [ConcertImage1, ConcertImage2, ConcertImage3, ConcertImage4]; // รายการรูปภาพ
  const [currentIndex, setCurrentIndex] = useState(0); // ใช้ index เพื่อติดตามรูปภาพปัจจุบัน

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // เปลี่ยนไปยังรูปถัดไป
  };

  const handlePreviousImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    ); // เปลี่ยนไปยังรูปก่อนหน้า
  };
  const [selected, setSelected] = useState("ทั้งหมด");

  const categories = [
    { label: "ทั้งหมด", color: "#D74F72" }, // Highlighted button color
    { label: "THAI MASS", color: "#D74F72" },
    { label: "T-POP", color: "#D74F72" },
    { label: "K-POP", color: "#D74F72" },
    { label: "INTERNATIONAL", color: "#D74F72" },
  ];

  const events = [
    {
      image: cImage,
      title: "❤️‍🔥: 2024 ZEROBASEONE THE FIRST TOUR",
      date: "🗓️:  5 ตุลาคม 2567",
      time: "⏰: 10:00 น. - 22:00 น.",
      location: "📌: อิมแพ็ค เอ็กซิบิชั่น เมืองทองธานี",
      category: "THAI MASS",
      price: 4500,
    },
    {
      image: c1Image,
      title: "❤️‍🔥: 2024 YUGYEOM TOUR [TRUSTY] IN BANGKOK",
      date: "🗓️: 12 ตุลาคม 2567",
      time: "⏰: 10:00 น. - 22:00 น.",
      location: "📌: อิมแพ็ค อารีน่า เมืองทองธานี",
      category: "K-POP",
      price: 3500,
    },
    {
      image: c2Image,
      title: "❤️‍🔥: POLYCAT VIRTUAL MEMORY CONCERT 2024",
      date: "🗓️:  19 ตุลาคม 2567",
      time: "⏰: 12:00 น. - 23:00 น.",
      location: "📌: ธันเดอร์โดม เมืองทองธานี",
      category: "INTERNATIONAL",
      price: 5500,
    },
    {
      image: c3Image,
      title: "❤️‍🔥: 2024 JIN YOUNG FANMEETING IN THAILAND",
      date: "🗓️: 14 ตุลาคม 2567",
      time: "⏰: 17:00 - 18:30 น.",
      location: "📌: Siam-Pic Ganesha Hall",
      price: 4500,
    },
    {
      image: c4Image,
      title: "❤️‍🔥: SUNSU Presents Sweet Sunshine With StangTari",
      date: "🗓️: 20 ตุลาคม 2567",
      time: "⏰: 14:00 - 20:00 น.",
      location: "📌: LIDO CONNECT HALL 2",
      price: 2500,
    },
    {
      image: c5Image,
      title: "❤️‍🔥: โอเอสเคเอ็น รียูเนี่ยน ปาร์ตี้ 2024 ปาร์ตี้ให้สนุก",
      date: "🗓️: 26 ตุลาคม 2567",
      time: "⏰: 15:30 - 22:00 น.",
      location: "📌: โรงเรียนสวนกุหลาบวิทยาลัย นนทบุรี",
      price: 6500,
    },
    {
      image: c6Image,
      title: "❤️‍🔥: LONGLAY BEACH LIFE FESTIVAL 2024",
      date: "🗓️: 7-8 ธันวาคม 2567",
      time: "⏰: 14:00 - 23:59 น.",
      location: "📌: Diamond Beach (Longlay Beach)",
      price: 5500,
    },
    {
      image: c7Image,
      title: "❤️‍🔥: Knock Knock Knock: BUS 1st THAILAND FANCON",
      date: "🗓️: 6 ตุลาคม 2567",
      time: "⏰: 13.00 น.",
      location: "📌: เทอร์มินอล ฮอลล์",
      price: 7500,
    },
    {
      image: c8Image,
      title: "❤️‍🔥: PIT BABE 1st ANNIVERSARY (LEVEL UP) Presented by IN2IT",
      date: "🗓️:  17 พฤศจิกายน 2567",
      time: "⏰: 18.00 น.",
      location: "📌: TRUE ICON HALL",
      price: 3500,
    },
    {
      image: c9Image,
      title: "❤️‍🔥: TANATAT SOLO STAGE BIRTHDAY",
      date: "🗓️:  5 ตุลาคม 2567",
      time: "⏰: 17:00 - 18:30 น.",
      location: "📌: Siam-Pic Ganesha Hall",
      price: 5500,
    },
    {
      image: c10Image,
      title: "❤️‍🔥: 2024 (G)I-DLE WORLD TOUR ",
      date: "🗓️:  19 ตุลาคม 2567",
      time: "⏰: 18:00 น.",
      location: "📌: อิมแพ็ค อารีน่า เมืองทองธานี",
      price: 4500,
    },
    {
      image: c11Image,
      title: "❤️‍🔥: TATE MCRAE THINK LATER ",
      date: "🗓️:  2 พฤศจิกายน 2567",
      time: "⏰: 19:00 น.",
      location: "📌: ยูโอบี ไลฟ์, เอ็มสเฟียร์",
      price: 2500,
    },
  ];
  const thaiMassConcerts = [
    {
      image: c2Image,
      title: "❤️‍🔥: POLYCAT VIRTUAL MEMORY CONCERT",
      date: "🗓️:  19 ตุลาคม 2567",
      time: "⏰: 12:00 น. - 23:00 น.",
      location: "📌: ธันเดอร์โดม เมืองทองธานี",
      category: "INTERNATIONAL",
      price: 5500,
    },
    {
      image: c5Image,
      title: "❤️‍🔥: โอเอสเคเอ็น รียูเนี่ยน ปาร์ตี้ 2024",
      date: "🗓️: 26 ตุลาคม 2567",
      time: "⏰: 15:30 - 22:00 น.",
      location: "📌: โรงเรียนสวนกุหลาบวิทยาลัย นนทบุรี",
      price: 6500,
    },
    {
      image: c7Image,
      title: "❤️‍🔥: Knock Knock Knock: BUS 1st THAILAND FANCON",
      date: "🗓️:  6 ตุลาคม 2567",
      time: "⏰: 13.00 น.",
      location: "📌: เทอร์มินอล ฮอลล์",
      price: 7500,
    },
    {
      image: c8Image,
      title: "❤️‍🔥: PIT BABE 1st ANNIVERSARY (LEVEL UP) Presented by IN2IT",
      date: "🗓️:  17 พฤศจิกายน 2567",
      time: "⏰: 18.00 น.",
      location: "📌: TRUE ICON HALL",
      price: 3500,
    },
    {
      image: c9Image,
      title: "❤️‍🔥: TANATAT SOLO STAGE BIRTHDAY",
      date: "🗓️:  5 ตุลาคม 2567",
      time: "⏰: 17:00 - 18:30 น.",
      location: "📌: Siam-Pic Ganesha Hall",
      price: 5500,
    },
  ];
  const tpopConcerts = [
    {
      image: c7Image,
      title: "❤️‍🔥: Knock Knock Knock: BUS 1st THAILAND FANCON",
      date: "🗓️:  6 ตุลาคม 2567",
      time: "⏰: 13.00 น.",
      location: "📌: เทอร์มินอล ฮอลล์",
      price: 7500,
    },
  ];
  const kpopConcerts = [
    {
      image: cImage,
      title: "❤️‍🔥: 2024 ZEROBASEONE THE FIRST TOUR",
      date: "🗓️:  5 ตุลาคม 2567",
      time: "⏰: 10:00 น. - 22:00 น.",
      location: "📌: อิมแพ็ค เอ็กซิบิชั่น เมืองทองธานี",
      category: "THAI MASS",
      price: 4500,
    },
    {
      image: c1Image,
      title: "❤️‍🔥: 2024 YUGYEOM TOUR [TRUSTY] IN BANGKOK",
      date: "🗓️: 12 ตุลาคม 2567",
      time: "⏰: 10:00 น. - 22:00 น.",
      location: "📌: อิมแพ็ค อารีน่า เมืองทองธานี",
      category: "K-POP",
      price: 3500,
    },
    {
      image: c3Image,
      title: "❤️‍🔥: 2024 JIN YOUNG FANMEETING IN THAILAND",
      date: "🗓️: 14 ตุลาคม 2567",
      time: "⏰: 17:00 - 18:30 น.",
      location: "📌: Siam-Pic Ganesha Hall",
      price: 4500,
    },
    {
      image: c4Image,
      title: "❤️‍🔥: SUNSU Presents Sweet Sunshine With StangTari",
      date: "🗓️: 20 ตุลาคม 2567",
      time: "⏰: 14:00 - 20:00 น.",
      location: "📌: LIDO CONNECT HALL 2",
      price: 2500,
    },
    {
      image: c10Image,
      title: "❤️‍🔥: 2024 (G)I-DLE WORLD TOUR ",
      date: "🗓️: วันเสาร์ที่ 19 ตุลาคม 2567",
      time: "⏰: 18:00 น.",
      location: "📌: อิมแพ็ค อารีน่า เมืองทองธานี",
      price: 4500,
    },
  ];
  const interConcerts = [
    {
      image: c6Image,
      title: "❤️‍🔥: LONGLAY BEACH LIFE FESTIVAL 2024",
      date: "🗓️: 7-8 ธันวาคม 2567",
      time: "⏰: 14:00 - 23:59 น.",
      location: "📌: Diamond Beach (Longlay Beach)",
      price: 5500,
    },
    {
      image: c11Image,
      title: "❤️‍🔥: TATE MCRAE THINK LATER ",
      date: "🗓️:  2 พฤศจิกายน 2567",
      time: "⏰: 19:00 น.",
      location: "📌: ยูโอบี ไลฟ์, เอ็มสเฟียร์",
      price: 2500,
    },
  ];

  const filteredEvents =
    selected === "ทั้งหมด"
      ? events
      : selected === "THAI MASS"
      ? thaiMassConcerts
      : selected === "T-POP"
      ? tpopConcerts
      : selected === "K-POP"
      ? kpopConcerts
      : selected === "INTERNATIONAL"
      ? interConcerts
      : [];

useEffect(() =>{

},[dataconcert])
  return (
    <>
    {/* <ConcertDetailPage data={dataconcert}/> */}
    <Box
      p={2}
      mb={8}
      bgcolor="gray.800"
      color="white"
      borderRadius={2}
      boxShadow={3}
      border={1}
      borderColor="gray.700"
      width={1140}
      sx={{
        background: "linear-gradient(135deg, #f3e5f5 30%, #FFB3BA 100%)",
      }}
    >
      {/* ส่วนที่ 1 */}
      <Typography
        variant="h2"
        color="#FF4081"
        fontWeight="bold"
        gutterBottom
        sx={{ position: "relative" }}
      >
        🎡ᴄᴏɴᴄᴇʀᴛꜱ
      </Typography>
      <Typography
        variant="h5"
        color="black"
        fontWeight="bold"
        gutterBottom
        sx={{ position: "relative" }}
      >
        This is the page for upcoming concerts!
      </Typography>

      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={2}
      >
        {/* รูปภาพ */}
        <Box
          component="img"
          src={images[currentIndex]} // ใช้ index เพื่อแสดงรูปภาพปัจจุบัน
          alt="Concert"
          sx={{
            width: "90%",
            maxHeight: "700px",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />

        {/* ปุ่ม */}
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          position="absolute"
          top="47%"
          sx={{
            transform: "translateY(-50%)",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePreviousImage}
            disabled={currentIndex === 0} // ปุ่มก่อนหน้าจะถูกปิดใช้งานเมื่ออยู่ที่รูปแรก
            sx={{
              minWidth: "50px",
              minHeight: "50px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &#9664;
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleNextImage}
            disabled={currentIndex === images.length - 1} // ปุ่มถัดไปจะถูกปิดใช้งานเมื่ออยู่ที่รูปสุดท้าย
            sx={{
              minWidth: "50px",
              minHeight: "50px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &#9654;
          </Button>
        </Box>
      </Box>

      {/* ส่วนที่ 2 */}
      <Typography
        variant="h4"
        color="#FF4081"
        fontWeight="bold"
        gutterBottom
        sx={{ position: "relative", mt: 4 }} // เพิ่ม margin-top ตามต้องการ
      >
        ᴇɴᴊᴏʏ ᴛʜɪꜱ ᴀᴍᴀᴢɪɴɢ ᴄᴏɴᴄᴇʀᴛ ᴘᴇʀꜰᴏʀᴍᴀɴᴄᴇ!
      </Typography>
      {/* รูปภาพเรียงกันแนวนอน */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mt={5}
      >
        <Link to="/concert/bus">
          {/* Link to Concert 1 */}
          <Box textAlign="center">
            <Box
              component="img"
              src={Bus}
              alt="Concert 1"
              sx={{
                width: "110%",
                maxHeight: "170px",
                objectFit: "cover",
                borderRadius: 2,
                mr: 1,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
            <Typography mt={1} color="black" fontWeight="bold">
              {" "}
              BUS
            </Typography>
          </Box>
        </Link>

        <Link to="/concert/got7">
          {/* Link to Concert 2 */}
          <Box textAlign="center">
            <Box
              component="img"
              src={Got7}
              alt="Concert 2"
              sx={{
                width: "110%",
                maxHeight: "170px",
                objectFit: "cover",
                borderRadius: 2,
                mr: 1,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
            <Typography mt={1} color="black" fontWeight="bold">
              {" "}
              GOT7
            </Typography>
          </Box>
        </Link>

        <Link to="/concert/hypen">
          {/* Link to Concert 3 */}
          <Box textAlign="center">
            <Box
              component="img"
              src={Enhypen}
              alt="Concert 3"
              sx={{
                width: "110%",
                maxHeight: "170px",
                objectFit: "cover",
                borderRadius: 2,
                mr: 1,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
            <Typography mt={1} color="black" fontWeight="bold">
              {" "}
              ENHYPEN
            </Typography>
          </Box>
        </Link>

        <Link to="/concert/pixxie">
          {/* Link to Concert 4 */}
          <Box textAlign="center">
            <Box
              component="img"
              src={Pixxie}
              alt="Concert 4"
              sx={{
                width: "110%",
                maxHeight: "170px",
                objectFit: "cover",
                borderRadius: 2,
                mr: 1,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
            <Typography mt={1} color="black" fontWeight="bold">
              {" "}
              PIXXIE
            </Typography>
          </Box>
        </Link>

        <Link to="/concert/lykn">
          {/* Link to Concert 5 */}
          <Box textAlign="center">
            <Box
              component="img"
              src={Lykn}
              alt="Concert 5"
              sx={{
                width: "105%",
                maxHeight: "170px",
                objectFit: "cover",
                borderRadius: 2,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
            <Typography mt={1} color="black" fontWeight="bold">
              {" "}
              LYKN
            </Typography>
          </Box>
        </Link>
      </Box>

      {/* ส่วนที่ 3 */}
      <Typography
        variant="h4"
        color="#FF4081"
        fontWeight="bold"
        gutterBottom
        sx={{ position: "relative", mt: 4 }} // เพิ่ม margin-top ตามต้องการ
      >
        ᴍᴏᴍᴇɴᴛ ᴄᴏɴᴄᴇʀᴛ
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={4}
        sx={{
          width: "100%", // ให้แสดงเต็มความกว้าง
          overflow: "hidden",
          borderRadius: 4, // มุมโค้งมน
          boxShadow: 3, // เงา
        }}
      >
        <iframe
          width="860"
          height="515"
          src="https://www.youtube.com/embed/Qh3NVhWXOOE?autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)" // 2 คอลัมน์
          gap={2}
          mt={4}
          width="80%" // ปรับความกว้างตามต้องการ
        >
          <img
            src={Gif}
            alt="Image 1"
            style={{ width: "100%", borderRadius: 8, height: "100%" }}
          />
          <img
            src={Gif1}
            alt="Image 2"
            style={{ width: "100%", borderRadius: 8 }}
          />
          <img
            src={Gif2}
            alt="Image 3"
            style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
          />
          <img
            src={Gif3}
            alt="Image 4"
            style={{ width: "100%", borderRadius: 8, height: "96%" }}
          />
        </Box>
      </Box>

      {/* ส่วนที่ 4 */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        p={5}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => setSelected(category.label)}
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 20,
              fontWeight: selected === category.label ? "bold" : "normal",
              color: selected === category.label ? "white" : "black",
              backgroundColor:
                selected === category.label ? category.color : "#f9f9f9",
              "&:hover": {
                backgroundColor:
                  selected === category.label ? category.color : "#e3e3e3",
              },
              border:
                selected === category.label
                  ? "1px solid #D74F72"
                  : "1px solid #e0e0e0",
              paddingX: 2,
            }}
          >
            {category.label}
          </Button>
        ))}
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        marginTop={-5}
        justifyContent="flex-start"
        gap={2}
        p={5}
      >
        {filteredEvents.map((event, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="start"
            sx={{
              border: "2px solid white",
              borderRadius: 2,
              padding: 2,
              flexBasis: "calc(33.33% - 50px)", // ใช้ 33.33% ของความกว้างลดด้วยระยะห่าง
              margin: "10px 0", // เพิ่ม margin เพื่อเว้นระยะห่างระหว่างกรอบ
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "palevioletred",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <img
              src={event.image}
              alt={event.title}
              style={{ width: 150, height: 170, borderRadius: "5%" }}
            />
            <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
              <Typography fontSize="14px" color="black" fontWeight="bold">
                {event.title}
              </Typography>
              <Typography fontSize="14px" color="#00bc20" fontWeight="bold">
                {event.date}
              </Typography>
              <Typography fontSize="14px" color="#46adff" fontWeight="bold">
                {event.time}
              </Typography>
              <Typography fontSize="14px" color="#1e4db1" fontWeight="bold">
                {event.location}
              </Typography>
              <Button
                onClick={() => handleBuyTicket(event)}
                variant="contained"
                sx={{
                  marginTop: 2,
                  borderRadius: 20,
                  backgroundColor: "red",
                  width: 100,
                  height: 30,
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#c40d19",
                    color: "white",
                    border: "1px solid white",
                  },
                }}
              >
                ซื้อบัตร
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
    </>
  );
};

export default Concert;
