/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import Gif from "/src/assets/concert/con5.gif";
import dayjs from "dayjs";
import Gif1 from "/src/assets/concert/gif2.gif";
import Gif2 from "/src/assets/concert/_on.gif";
import Gif3 from "/src/assets/concert/gif4.gif";
import { IConcert } from "./HomeTest";
import axios from "axios";

const Concert: React.FC = () => {
  const navigate = useNavigate();

  const handleBuyTicket = (item: {
    id: number;
    name: string;
    img: string;
    date: string;
    time: string;
    location: string;
    price: number;
    availableSeats: number;
  }) => {
    // setDataconcert(item)
    console.log("Item data:", item); // ตรวจสอบค่าที่ส่งมา
    navigate("concert-detail", { state: item });
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // เปลี่ยนไปยังรูปถัดไป
  };

  const handlePreviousImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    ); // เปลี่ยนไปยังรูปก่อนหน้า
  };
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selected, setSelected] = useState("ทั้งหมด");
  const [dataConcert, setDataConcert] = useState<any[]>([]); // Mock data for sports events
  const [dataConcertthaimass, setDataConcertThaimass] = useState<any[]>([]);
  const [dataConcerttpop, setDataConcertTpop] = useState<any[]>([]);
  const [dataConcertkpop, setDataConcertKpop] = useState<any[]>([]);
  const [dataConcertinter, setDataConcertInter] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [concerts, setConcerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAllConcerts");
        const data: IConcert[] = await response.json();
        const formattedConcert = data.map((item) => ({
          id: item.id,
          img: `http://localhost/concert/all/${item.image}`,
          title: item.name,
          date: `🗓️: ${dayjs(item.date).format("DD/MM/YY")}`,
          time: `⏰: ${item.time}`,
          location: `📌: ${item.location}`,
          price: item.price,
        }));

        setDataConcert(formattedConcert);
      } catch (error) {
        console.error("Error fetching concert data:", error);
      }
    };
    const fetchConcertThaimass = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getAllConcertsthaiMass"
        );
        const data: IConcert[] = await response.json();
        const formattedConcert = data.map((item) => ({
          id: item.id,
          img: `http://localhost/concert/all/${item.image}`, // ใช้ฟิลด์ `img` จาก API
          title: item.name, // ใช้ฟิลด์ `name` จาก API
          date: `🗓️: ${dayjs(item.date).format("DD/MM/YY")}`, // เพิ่มไอคอนหรือฟอร์แมตข้อความ
          time: `⏰: ${item.time}`, // ฟิลด์ `time` (ถ้ามี)
          location: `📌: ${item.location}`, // ใช้ฟิลด์ `location`
          price: item.price, // ใช้ฟิลด์ `price`
        }));

        setDataConcertThaimass(formattedConcert);
      } catch (error) {
        console.error("Error fetching concert data:", error);
      }
    };
    const fetchConcertTpop = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getAllConcertstpop"
        );
        const data: IConcert[] = await response.json();
        const formattedConcert = data.map((item) => ({
          id: item.id,
          img: `http://localhost/concert/all/${item.image}`,
          title: item.name,
          date: `🗓️: $${dayjs(item.date).format("DD/MM/YY")}`,
          time: `⏰: ${item.time}`,
          location: `📌: ${item.location}`,
          price: item.price,
        }));

        setDataConcertTpop(formattedConcert);
      } catch (error) {
        console.error("Error fetching concert data:", error);
      }
    };
    const fetchConcertkpop = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getAllConcertskpop"
        );
        const data: IConcert[] = await response.json();
        const formattedConcert = data.map((item) => ({
          id: item.id,
          img: `http://localhost/concert/all/${item.image}`,
          title: item.name,
          date: `🗓️: $${dayjs(item.date).format("DD/MM/YY")}`,
          time: `⏰: ${item.time}`,
          location: `📌: ${item.location}`,
          price: item.price,
        }));

        setDataConcertKpop(formattedConcert);
      } catch (error) {
        console.error("Error fetching concert data:", error);
      }
    };
    const fetchConcertinter = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getAllConcertsinter"
        );
        const data: IConcert[] = await response.json();
        const formattedConcert = data.map((item) => ({
          id: item.id,
          img: `http://localhost/concert/all/${item.image}`,
          title: item.name,
          date: `🗓️: $${dayjs(item.date).format("DD/MM/YY")}`,
          time: `⏰: ${item.time}`,
          location: `📌: ${item.location}`,
          price: item.price,
        }));

        setDataConcertInter(formattedConcert);
      } catch (error) {
        console.error("Error fetching concert data:", error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/concertsImage");
        const data = await response.json();
        setImages(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    axios
      .get("http://localhost:5000/concertsDetail")
      .then((response) => {
        setConcerts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the concerts!", error);
      });

    fetchConcert();
    fetchConcertThaimass();
    fetchConcertTpop();
    fetchConcertkpop();
    fetchConcertinter();
    fetchImages();
  }, []);

  const categories = [
    { label: "ทั้งหมด", color: "#FF4081" }, // Highlighted button color
    { label: "THAI MASS", color: "#FF4081" },
    { label: "T-POP", color: "#FF4081" },
    { label: "K-POP", color: "#FF4081" },
    { label: "INTERNATIONAL", color: "#FF4081" },
  ];

  const filteredEvents =
    selected === "ทั้งหมด"
      ? dataConcert
      : selected === "THAI MASS"
        ? dataConcertthaimass
        : selected === "T-POP"
          ? dataConcerttpop
          : selected === "K-POP"
            ? dataConcertkpop
            : selected === "INTERNATIONAL"
              ? dataConcertinter
              : [];

  return (
    <>
      <Box
      // p={2}
      // mb={8}
      // bgcolor="gray.800"
      // color="white"
      // borderRadius={2}
      // boxShadow={3}
      // border={1}
      // borderColor="gray.700"
      // width={1140}
      // sx={{
      //   background: "linear-gradient(135deg, #EECDA3 0%, #EF629F 100%);",
      // }}
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
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            {images.length > 0 && (
              <Box
                component="img"
                src={`http://localhost/concert/${images[currentIndex].image}`} // ใช้ URL ของรูปภาพจาก API
                alt="Concert"
                sx={{
                  width: "90%",
                  maxHeight: "700px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}
          </Box>

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
          {concerts.map((concert) => (
            <Link to={concert.link} key={concert.id}>
              <Box textAlign="center">
                <Box
                  component="img"
                  src={`http://localhost/concert/${concert.image}`}
                  alt={concert.name}
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
                  {concert.name}
                </Typography>
              </Box>
            </Link>
          ))}
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
            src="https://www.youtube.com/embed/o4t8YEM5Qco?autoplay=1&mute=1"
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
                backgroundColor: "#fce4ec",
                flexBasis: "calc(36.33% - 50px)", // ใช้ 33.33% ของความกว้างลดด้วยระยะห่าง
                margin: "10px 0", // เพิ่ม margin เพื่อเว้นระยะห่างระหว่างกรอบ
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "white",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <img
                src={event.img}
                alt={event.title}
                style={{ width: 150, height: 170, borderRadius: "5%" }}
              />
              <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                <Typography fontSize="14px" color="black" fontWeight="bold">
                  {event.title}
                </Typography>
                <Typography fontSize="14px" color="#00bc20" fontWeight="bold" gutterBottom>
                {event.date}
                </Typography>
                <Typography fontSize="14px" color="#4fc3f7" fontWeight="bold">
                  {event.time}
                </Typography>
                <Typography fontSize="14px" color="#1e4db1" fontWeight="bold">
                  {event.location}
                </Typography>
                <Button
                  // onClick={() => handleBuyTicket(event)}
                  onClick={() =>
                    handleBuyTicket({
                      id: event.id,
                      img: event.img,
                      time: event.time,
                      name: event.title,
                      date: event.date,
                      location: event.location,
                      price: event.price,
                      availableSeats: event.availableSeats,
                    })
                  }
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
