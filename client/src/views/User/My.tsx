/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick-theme.css";

const Promotion = () => {
  const [datapromotiondetail, setPromotionDetail] = useState<any[]>([]);

  useEffect(() => {
    const fetchPromotionDetail = async () => {
      try {
        const response = await fetch('http://localhost:5000/getpromotionDetail');
        const data = await response.json();
        setPromotionDetail(data); // บันทึกข้อมูลใน State
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    fetchPromotionDetail();
  }, []);

  //นับถอยหลัง
  const targetTime = new Date();
  targetTime.setHours(targetTime.getHours() + 3); // เริ่มนับถอยหลังจาก 3 ชั่วโมง

  return (
    <Box
      sx={{
        width: "1090px",
        padding: 6,
        background: "linear-gradient(to right, #FFD1DC, #D6EFFF)",
        borderRadius: 8,
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)",
        margin: "auto",
      }}
    >
      <Typography
        variant="h4"
        color="#ad054b"
        fontWeight="bold"
        gutterBottom
        sx={{ position: "relative" }}
      >
        PROMOTION
      </Typography>
      <Typography
        variant="h5"
        color="red"
        fontWeight="bold"
        gutterBottom
        sx={{ position: "relative" }}
      >
        ᴇɴᴊᴏʏ ᴇxᴄʟᴜꜱɪᴠᴇ เมื่อซื้อสินค้าครบตามที่กำหนดรับไปเลยส่วนลด!
      </Typography>

      {/* ส่วนที่ 3 กรอบข้างใน */}
      <Box
        sx={{
          border: "2px solid #ad054b",
          borderRadius: "0 0 20px 20px",
          padding: "10px",
          marginTop: "5px",
          backgroundColor: "rgb(255, 213, 251)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            marginTop: "5px",
            background: "linear-gradient(to left, white 70%, #db055e 30%)",
            display: "flex",
            alignItems: "center",
            width: "95%",
            maxWidth: "120%",
            boxShadow:
              "0 4px 10px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.3)",
          }}
        >
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgb(255, 255, 255)",
              color: "white",
              margin: 0,
              padding: "5px",
              marginTop: "5px",
              marginLeft: "50px",
            }}
          >
            INTERGETHER
          </Typography>
        </Box>

        {/* การเลื่อนในแนวนอน */}
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDirection="row"
          mt={4}
          sx={{
            overflowX: "auto", // อนุญาตให้เลื่อนในแนวนอน
            overflowY: "hidden", // ซ่อนการล้นในแนวตั้ง
            whiteSpace: "nowrap", // ป้องกันไม่ให้มีการห่อข้อความ
            padding: "10px", // เพิ่มระยะห่างภายใน
            width: "100%", // Ensure it takes full width of parent
            gap: "20px", // เพิ่มช่องว่างระหว่าง Promotion Card
          }}
        >
          {datapromotiondetail.map((promotion) => (
            <Box
              sx={{
                flex: "0 0 auto", // ป้องกัน Card ยืดเกินไป
                maxWidth: "300px", // กำหนดความกว้างสูงสุดของ Card
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {/* ป้ายลดราคา */}
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "#ec407a", // สีพื้นหลัง
                  color: "white", // สีตัวอักษร
                  fontSize: "16px", // ขนาดตัวอักษร
                  fontWeight: "bold",
                  padding: "5px 10px", // ระยะห่างภายใน
                  borderRadius: "5px", // มุมโค้งของป้าย
                }}
              >
                {promotion.discount}
              </Box>

              <img
                src={`http://localhost/promotion/${promotion.image}`}
                alt={promotion.name}
                style={{
                  width: "100%", // รักษาขนาดภาพให้เต็มกรอบ
                  height: "auto", // ปรับความสูงให้เป็นอัตโนมัติเพื่อรักษาสัดส่วน
                  maxHeight: "300px", // กำหนดความสูงสูงสุดสำหรับรูปภาพ
                  objectFit: "cover",
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <Box sx={{ padding: "10px", textAlign: "center" }}>
                <Typography
                  fontSize={25}
                  sx={{ fontWeight: "bold", color: "#ad054b" }}
                >
                  {promotion.name}
                </Typography>
                {/* Horizontal line */}
                <Box
                  sx={{
                    height: "1px",
                    backgroundColor: "#ad054b",
                    margin: "5px 0", // ระยะห่างด้านบนและล่าง
                    width: "100%", // ทำให้เส้นเต็มความกว้าง
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ textDecoration: "line-through", color: "gray" }}
                >
                  💰฿{promotion.oldPrice}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#fc0e71" }}
                >
                  ฿{promotion.newPrice}
                </Typography>
                <Typography variant="h6" sx={{ color: "#888" }}>
                  🛒 เริ่มโปรตั้งแต่ {promotion.dates}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Promotion;
