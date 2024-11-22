import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import SportImage from "/src/assets/sport/sports.jpg";
import Sport1Image from "/src/assets/sport/sports1.jpg";
import Sport1 from "/src/assets/sport/sport5.jpg";
import Sport2 from "/src/assets/sport/sport2.webp";
import Sport3 from "/src/assets/sport/sport3.jpg";
import Sport4 from "/src/assets/sport/sport4.jpg";
import Sport5 from "/src/assets/sport/sport6.jpg";
import Sport6 from "/src/assets/sport/sport7.webp";
import Sport7 from "/src/assets/sport/sport11.jpg";
import Sport8 from "/src/assets/sport/sport10.jpg";
import Sport9 from "/src/assets/sport/sport9.jpg";
import s1Image from "/src/assets/sport/all/s1.jpg";
import s2Image from "/src/assets/sport/all/s2.png";
import s3Image from "/src/assets/sport/all/s3.png";
import s4Image from "/src/assets/sport/all/s4.png";
import s5Image from "/src/assets/sport/all/s5.png";
import s6Image from "/src/assets/sport/all/s6.png";
import s7Image from "/src/assets/sport/all/s7.png";
import { useNavigate } from "react-router-dom";


const Sport: React.FC = () => {
  const navigate = useNavigate();
  const handleBuyTicket = (item: {
    id: number;
    name: string;
    date: string;
    location: string;
    price: number;
    availableSeats: number;
  }) => {
    navigate("sport-detail", { state: item });
  };

  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState("ทั้งหมด");

  const images = [Sport6, Sport7, Sport8, Sport9];

  const categories = [
    { label: "ทั้งหมด", color: "#FF4081" }, // Highlighted button color
    { label: "BOXING", color: "#FF4081" },
    { label: "FOOTBALL", color: "#FF4081" },
    { label: "OTHER", color: "#FF4081" },
  ];

  // ข้อมูลกีฬา
  const allSports = [
    {
      img: s1Image,
      title: "❤️‍🔥: ",
      date: "🗓️: ",
      time: "⏰:  ",
      location: "📌: ",
      price: 3800
    },
  ];
  const boxingSports = [
    {
      img: s1Image,
      title: "❤️‍🔥: ",
      date: "🗓️: ",
      time: "⏰:  ",
      location: "📌: ",
      price: 3800
    },
  ];
  const ballSports = [
    {
      img: s2Image,
      title: "❤️‍🔥: ",
      date: "🗓️: ",
      time: "⏰: ",
      location: "📌:สนามราชมังคลากีฬาสถาน",
      price: 2900
    },
  ];
  const otherSports = [
    {
      img: s6Image,
      title: "❤️‍🔥: ฟุตบอลชิงถ้วยพระราชทาน คิงส์คัพ Champions",
      date: "🗓️: 11 ตุลาคม 2567",
      time: "⏰: 16.30 น.",
      location: "📌: สนามกีฬาติณสูลานนท์",
      price: 5500
    },
  ];

  const filteredEvents =
    selected === "ทั้งหมด"
      ? allSports
      : selected === "BOXING"
      ? boxingSports
      : selected === "FOOTBALL"
      ? ballSports
      : selected === "OTHER"
      ? otherSports
      : [];

  return (
    <Box
      // p={2}
      // mb={8}
      // bgcolor="gray.800"
      // color="white"
      // borderRadius={2}
      // boxShadow={3}
      // border={1}
      // borderColor="gray.700"
      width={1140}
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
          transition: "transform 0.3s ease-in-out", // เพิ่มการเคลื่อนไหวเมื่อเอาเมาส์ไปชี้
          "&:hover": {
            transform: "scale(1.1)", // ขยายขนาดข้อความเมื่อเอาเมาส์ไปชี้
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
        display="flex" // ใช้ Flexbox สำหรับการจัดเรียง
        justifyContent="flex-start" // จัดแนวรายการไปทางซ้าย
        alignItems="center" // จัดรายการให้อยู่ในแนวกลาง
        flexDirection="row" // เปลี่ยนเป็นแถวเพื่อการเลื่อนแนวนอน
        mt={4} // ตั้งค่าระยะห่างด้านบน
        sx={{
          overflowX: "auto", // อนุญาตให้เลื่อนในแนวนอน
          overflowY: "hidden", // ซ่อนการล้นในแนวตั้ง
          whiteSpace: "nowrap", // ป้องกันไม่ให้มีการห่อข้อความของรูปภาพ
          padding: "10px", // เพิ่มระยะห่างภายในสำหรับการเว้น
        }}
      >
        <Box position="relative">
          <img
            src={Sport1}
            alt="แบตมินตัน"
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
            bgcolor="white" // พื้นหลังข้อความ
            borderRadius={30} // ทำให้กรอบมีลักษณะโค้งมน
            p="5px 10px" // การเว้นระยะภายใน
            fontWeight="bold"
            color="black" // สีข้อความ
            fontSize="15px" // ขนาดตัวอักษร
            sx={{ boxShadow: 1 }} // เพิ่มเงาให้กรอบข้อความ
          >
            <Typography variant="h6" color="black" sx={{ margin: 0 }}>
              แบตมินตัน
            </Typography>
          </Box>
        </Box>

        <Box position="relative">
          <img
            src={Sport2}
            alt="บาส"
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
            sx={{ boxShadow: 1 }} // เพิ่มเงาให้กรอบข้อความ
          >
            <Typography variant="h6" color="black" sx={{ margin: 0 }}>
              บาสเก็ตบอล
            </Typography>
          </Box>
        </Box>

        <Box position="relative">
          <img
            src={Sport3}
            alt="ฟุตบอล"
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
            sx={{ boxShadow: 1 }} // เพิ่มเงาให้กรอบข้อความ
          >
            <Typography variant="h6" color="black" sx={{ margin: 0 }}>
              ฟุตบอล
            </Typography>
          </Box>
        </Box>

        <Box position="relative">
          <img
            src={Sport4}
            alt="วอลเลบอลย์"
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
            sx={{ boxShadow: 1 }} // เพิ่มเงาให้กรอบข้อความ
          >
            <Typography variant="h6" color="black" sx={{ margin: 0 }}>
              วอลเลบอลย์
            </Typography>
          </Box>
        </Box>

        <Box position="relative" mr={2}>
          <img
            src={Sport5}
            alt="ปิงปอง"
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
            sx={{ boxShadow: 1 }} // เพิ่มเงาให้กรอบข้อความ
          >
            <Typography variant="h6" color="black" sx={{ margin: 0 }}>
              ปิงปอง
            </Typography>
          </Box>
        </Box>
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
          transition: "transform 0.3s ease-in-out", // เพิ่มการเคลื่อนไหวเมื่อเอาเมาส์ไปชี้
          "&:hover": {
            transform: "scale(1.1)", // ขยายขนาดข้อความเมื่อเอาเมาส์ไปชี้
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

      <Box display="flex" justifyContent="center" mt={2}>
        <img
          src={isHovered ? Sport1Image : SportImage} // เปลี่ยนภาพเมื่อเอาเมาส์ไปชี้
          alt="Sport Image"
          style={{
            width: "1110px",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover",
            transition: "0.3s ease-in-out", // เพิ่มการเคลื่อนไหวเปลี่ยนภาพ
          }}
          onMouseEnter={() => setIsHovered(true)} // แสดงภาพที่สองเมื่อเอาเมาส์ไปชี้
          onMouseLeave={() => setIsHovered(false)} // กลับมาภาพแรกเมื่อเอาเมาส์ออก
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              width: "47%",
              height: "300px", // ตั้งความสูงที่ต้องการ
              marginBottom: "10px",
              marginRight: "18px",
              marginLeft: "15px",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, filter 0.3s ease-in-out", // เพิ่ม transition สำหรับ filter
              "&:hover": {
                transform: "translateY(-10px) scale(1.05)", // ขยับขึ้นและขยายขนาด
                boxShadow:
                  "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.6)", // เพิ่มเงาวิบวับ
                filter: "brightness(1.2)", // ทำให้รูปภาพสว่างขึ้น
              },
              overflow: "hidden",
            }}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{
                width: "100%",
                height: "100%", // ทำให้รูปภาพมีความสูงเท่ากับ Box
                objectFit: "cover", // ครอบรูปภาพให้เต็มพื้นที่
                borderRadius: "10px",
              }}
            />
          </Box>
        ))}
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
        {filteredEvents.map((event, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="start"
            sx={{
              border: "2px solid white",
              borderRadius: 2,
              padding: 2,
              flexBasis: "calc(36.33% - 50px)", // ใช้ 33.33% ของความกว้างลดด้วยระยะห่าง
              margin: "10px 0", // เพิ่ม margin เพื่อเว้นระยะห่างระหว่างกรอบ
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#fce4ec",
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
  );
};

export default Sport;
