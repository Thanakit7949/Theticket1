/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ISports } from "./HomeTest";
import dayjs from "dayjs";

const Sport: React.FC = () => {
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
    console.log("Item data:", item); // ตรวจสอบค่าที่ส่งมา
    navigate("sport-detail", { state: item });
  };

  const [selected, setSelected] = useState("ทั้งหมด");
  const [dataSports, setDataSports] = useState<any[]>([]);
  const [sports, setSports] = useState<any[]>([]);
  const [sportimages, setImages] = useState<any[]>([]);

  const fetchSportsByType = async (type: string) => {
    try {
      const response = await fetch(`http://localhost:5000/getSportsByType/${type}`);
      const data: ISports[] = await response.json();
      const formattedSports = data.map((item) => ({
        id: item.id,
        img: `http://localhost/sport/all/${item.image}`,
        title: item.name,
        date: `🗓️: ${item.date}`,
        time: `⏰: ${item.time}`,
        location: `📌: ${item.location}`,
        price: item.price,
      }));
      setDataSports(formattedSports);
    } catch (error) {
      console.error(`Error fetching ${type} sports data:`, error);
    }
  };

  const fetchSportsImage = async () => {
    try {
      const response = await fetch("http://localhost:5000/sportsImage");
      const data: ISports[] = await response.json();
      setSports(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/getImages");
      const data: ISports[] = await response.json();
      setImages(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    const typeMap = {
      "ทั้งหมด": "ALL",
      "INDOOR": "indoor",
      "OUTDOOR": "outdoor",
      "OTHER": "other"
    };
    fetchSportsByType(typeMap[selected]);
    fetchSportsImage();
    fetchImages();
  }, [selected]);

  const categories = [
    { label: "ทั้งหมด", color: "#FF4081" },
    { label: "INDOOR", color: "#FF4081" },
    { label: "OUTDOOR", color: "#FF4081" },
    { label: "OTHER", color: "#FF4081" },
  ];

  return (
    <Box width={1140}>
      {/* ส่วนที่ 1 */}
      <Typography
        variant="h2"
        color="#FF4081"
        fontWeight="bold"
        gutterBottom
        sx={{ position: "relative" }}
      >
        🏐 ꜱᴘᴏʀᴛꜱ 🏀
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={4}
      >
        <iframe
          width="1100"
          height="550"
          src="https://www.youtube.com/embed/1IM9nF6uOr0?autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="video-iframe"
        ></iframe>
      </Box>

      {/* ส่วนที่ 2 */}
      <Typography
        variant="h4"
        color="#FF4081"
        fontWeight="bold"
        marginTop={5}
        gutterBottom
        sx={{
          position: "relative",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        ประเภทการแข่งขันกีฬา
      </Typography>

      <Typography
        variant="h5"
        color="#1a237e"
        fontWeight="bold"
        sx={{ position: "relative" }}
      >
        ᴛʜᴇ ᴛʀᴏᴘʜʏ ɪꜱ ɪɴ ꜰʀᴏɴᴛ ᴏꜰ ʏᴏᴜ. ᴡʜᴇᴛʜᴇʀ ʏᴏᴜ ᴀʀᴇ ᴀꜰʀᴀɪᴅ ᴏʀ ʙʀᴀᴠᴇ ɪꜱ ɪɴ
        ʏᴏᴜʀ ʜᴇᴀʀᴛ.
      </Typography>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        mt={4}
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          padding: "10px",
        }}
      >
        {sports.map((item) => (
          <Box position="relative" key={item.id}>
            <img
              src={`http://localhost/sport/${item.image}`}
              alt={item.name}
              style={{
                margin: "10px",
                width: "370px",
                height: "270px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <Box
              position="absolute"
              bottom={25}
              left={25}
              bgcolor="white"
              borderRadius={30}
              p="5px 10px"
              fontWeight="bold"
              color="black"
              fontSize="15px"
              sx={{ boxShadow: 1 }}
            >
              <Typography variant="h6" color="black" sx={{ margin: 0 }}>
                {item.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* ส่วนที่ 3 */}
      <Typography
        variant="h4"
        color="#FF4081"
        fontWeight="bold"
        marginTop={5}
        gutterBottom
        sx={{
          position: "relative",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        การแข่งขันกีฬากับผู้ต่อสู้
      </Typography>
      <Typography
        variant="h5"
        color="#1a237e"
        fontWeight="bold"
        sx={{ position: "relative" }}
      >
        ᴛʜᴇ ᴏɴʟʏ ᴡᴀʏ ᴛᴏ ꜱᴜᴄᴄᴇᴇᴅ ɪɴ ꜱᴘᴏʀᴛꜱ ɪꜱ ᴛᴏ ᴋᴇᴇᴘ ᴘᴜꜱʜɪɴɢ ʏᴏᴜʀꜱᴇʟꜰ ꜰᴜʀᴛʜᴇʀ
        ᴇᴠᴇʀʏ ᴅᴀʏ.
      </Typography>

      <Box display="flex" justifyContent="center" mt={2}></Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        {sportimages.map((image, index) => (
          <Box
            key={index}
            sx={{
              width: "47%",
              height: "300px",
              marginBottom: "10px",
              marginRight: "18px",
              marginLeft: "15px",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, filter 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-10px) scale(1.05)",
                boxShadow:
                  "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.6)",
                filter: "brightness(1.2)",
              },
              overflow: "hidden",
            }}
          >
            <img
              src={`http://localhost/sport/${image.image}`}
              alt={image.description}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        ))}
      </Box>

      {/* ส่วนที่ 4 คลิกเลือก*/}
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
                  ? "1px solid #FF4081"
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
        {dataSports.map((event, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="start"
            sx={{
              border: "2px solid white",
              borderRadius: 2,
              padding: 2,
              backgroundColor: "#fce4ec",
              flexBasis: "calc(36.33% - 50px)",
              margin: "10px 0",
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
              <Typography fontSize="14px" color="#00bc20" fontWeight="bold">
                {event.date}
              </Typography>
              <Typography fontSize="14px" color="#4fc3f7" fontWeight="bold">
                {event.time}
              </Typography>
              <Typography fontSize="14px" color="#1e4db1" fontWeight="bold">
                {event.location}
              </Typography>
              <Button
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
  );
};

export default Sport;
