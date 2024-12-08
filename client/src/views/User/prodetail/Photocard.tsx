import React from "react";
import { Box, Typography } from "@mui/material";
import image1 from "/src/assets/promotion/Photo1.jpg";
import image2 from "/src/assets/promotion/Photo4.jpg";
import image3 from "/src/assets/promotion/Photo3.jpg";
import image4 from "/src/assets/promotion/Photo2.jpg";
import image5 from "/src/assets/promotion/Photo6.jpg";
import image6 from "/src/assets/promotion/Photo5.jpg";

const Photocard: React.FC = () => {
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
      width={970}
      maxHeight="none"
      height={1100}
      sx={{
        background: "linear-gradient(135deg, #ffebee 0%, #ef9a9a 100%);",
      }}
    >
      <Typography
        variant="h4"
        color="#ad054b"
        fontWeight="bold"
        gutterBottom
        sx={{ position: "relative" }}
      >
        PHOTO CART
      </Typography>
      <Typography
        variant="h6"
        color="#ad054b"
        fontWeight="bold"
        gutterBottom
        sx={{ position: "relative" }}
      >
        โฟโต้การ์ด ที่เหมาะสำหรับคนที่ชอบสะสมการ์ด เพียงซื้อบัตรคอนที่เรา รับไปเลย
        โฟโต้การ์ด ฟรี!!!!!
      </Typography>

      <Box
        component="img"
        src={image1}
        alt="photocard"
        sx={{
          width: "100%",
          maxWidth: "600px",
          height: "650px",
          marginTop: 2,
          borderRadius: 2,
        }}
      />


      {/* Smaller images section */}
      <Box
        display="flex"
        justifyContent="space-between"
        mt={2}
        gap={2}
        sx={{
          flexWrap: "wrap",
        }}
      >
        <Box
          component="img"
          src={image2}
          alt="photocard small 1"
          sx={{
            width: "18%",
            height: "150px",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
        <Box
          component="img"
          src={image3}
          alt="photocard small 2"
          sx={{
            width: "18%",
            height: "150px",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
        <Box
          component="img"
          src={image4}
          alt="photocard small 3"
          sx={{
            width: "18%",
            height: "150px",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
        <Box
          component="img"
          src={image5}
          alt="photocard small 4"
          sx={{
            width: "18%",
            height: "150px",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
        <Box
          component="img"
          src={image6}
          alt="photocard small 5"
          sx={{
            width: "18%",
            height: "150px",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />
      </Box>
      
      <Typography
        variant="h6"
        color="#ad054b"
        fontWeight="bold"
        gutterBottom
        mt={5}
        sx={{ position: "relative" }}
      >
        แถมยังเป็นไอเทมที่ฮิตที่สุด หลายคนต้องมีกันแน่นอนสำหรับแฟนด้อม งานคอนเสิร์ตทั้งทีเราต้องมีการ์ดที่ไม่เหมือนใคร
      </Typography>
    </Box>
  );
};

export default Photocard;
