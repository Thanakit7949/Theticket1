import React, { useState } from "react";
import { Link } from 'react-router-dom'; 
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

const Concert: React.FC = () => {
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

  return (
    <Box
      p={2}
      mb={8}
      bgcolor="gray.800"
      color="white"
      borderRadius={2}
      boxShadow={3}
      border={1}
      borderColor="gray.700"
      width={1100}
      sx={{
        background: "linear-gradient(135deg, #BAE1FF 30%, #FFB3BA 100%)",
      }}
    >
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

        {/* ปุ่ม2 */}
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          position="absolute"
          top="47%"
          transform="translateY(-50%)"
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={5}>
  <Link to="/concert1"> {/* ลิงค์ไปที่หน้า Concert 1 */}
    <Box
      component="img"
      src={Bus}
      alt="Concert 1"
      sx={{
        width: "110%",
        maxHeight: "170px",
        objectFit: "cover",
        borderRadius: 2,
        mr: 1, // ระยะห่างระหว่างรูปภาพ
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    />
  </Link>
  
  <Link to="/concert2"> {/* ลิงค์ไปที่หน้า Concert 2 */}
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
  </Link>
  
  <Link to="/concert3"> {/* ลิงค์ไปที่หน้า Concert 3 */}
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
  </Link>
  
  <Link to="/concert4"> {/* ลิงค์ไปที่หน้า Concert 4 */}
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
  </Link>
  
  <Link to="/concert5"> {/* ลิงค์ไปที่หน้า Concert 5 */}
    <Box
      component="img"
      src={Lykn}
      alt="Concert 5"
      sx={{
        width: "110%",
        maxHeight: "170px",
        objectFit: "cover",
        borderRadius: 2,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    />
  </Link>
</Box>
    </Box>
  );
};

export default Concert;
