/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Slider from "react-slick";
import Pro9Image from "/src/assets/promotion/promo.webp";
import cat from "/src/assets/promotion/cat.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Promotion = () => {
  const navigate = useNavigate();
  const [datapromotion, setPromotion] = useState<any[]>([]);
  const [datapromotiondetail, setPromotionDetail] = useState<any[]>([]);
  const [dataproconsport, setProconSport] = useState<any[]>([]);

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลรูปภาพจาก Backend
    const fetchPromotionImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/getpromotionImage");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPromotion(data); // กำหนด state สำหรับข้อมูลรูปภาพ
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchPromotionDetail = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getpromotionDetail"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPromotionDetail(data); // บันทึกข้อมูลใน State
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    const fetchProConSport = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/getproconsport"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProconSport(data); // บันทึกข้อมูลใน State
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };


    fetchPromotionDetail();
    fetchPromotionImages();
    fetchProConSport();
  }, []);

  const handleCButtonClick = () => {
    setButtonText("ใช้ทันที");
    setIsUsed(true); // เปลี่ยนสถานะว่าคูปองถูกใช้แล้ว
  };

  const [isUsed, setIsUsed] = useState(false);
  const [buttonText, setButtonText] = useState("เก็บคูปอง");
  
  const handleNavigation = (link:any) => {
    navigate(link); // นำไปยังหน้าแต่ละไอเท็ม
  };

  //นับถอยหลัง
  const targetTime = new Date();
  targetTime.setHours(targetTime.getHours() + 3); // เริ่มนับถอยหลังจาก 3 ชั่วโมง

  const calculateTimeLeft = () => {
    const difference = targetTime - new Date();
    return Math.max(Math.floor(difference / 1000), 0); // คำนวณเวลาที่เหลือในหน่วยวินาที
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")} น.`; // รูปแบบเวลา
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Box
      sx={{
        //padding: 6,
        //background: "linear-gradient(to right, #FFD1DC, #D6EFFF)",
        //borderRadius: 8,
        //boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)",
        //margin: "auto",
        width: "1090px",
        //height: "3000px",
        // border: "2px solid #FFA4A2",
        //textAlign: "center",
        //position: "relative",
        // overflow: "hidden",
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

      {/* Image Carousel */}
      <Box sx={{ marginBottom: "30px" }}>
        <Slider {...sliderSettings}>
          {datapromotion.map((promotionImage, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: "400px",
                overflow: "hidden",
                borderRadius: "15px",
              }}
            >
              <img
                src={`http://localhost/promotion/${promotionImage.image}`} // ใช้ URL จากฐานข้อมูล
                alt={`Product ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* ส่วนที่ 2   ที่มีแมว และกรอบ */}
      <Box
        sx={{
          border: "2px solid #ad054b",
          borderRadius: "20px 20px 0 0",
          padding: "10px",
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background:
            "linear-gradient(to right, #f85599 40%, rgba(255, 255, 255, 0) 60%)",
        }}
      >
        <Box
          component="img"
          src={cat}
          alt="cat"
          sx={{
            width: "150px",
            height: "auto",
            marginLeft: "-70px",
            marginTop: "-40px",
          }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#ad054b"
          sx={{
            fontSize: "35px",
            textShadow: "2px 2px 5px rgb(255, 255, 255)",
            margin: 0,
            borderRadius: "10px",
            padding: "5px",
            marginTop: "-80px",
            marginLeft: "60px",
            display: "inline-block",
          }}
        >
          ลูกค้าใหม่
        </Typography>

        <Typography
          variant="h6"
          fontWeight="bold"
          color="#ad054b"
          sx={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "20px",
            marginLeft: "-250px",
          }}
        >
          สินค้าราคาพิเศษ + 🔖คู่ปองส่วนลด 50%
        </Typography>
      </Box>

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              margin: 0,
              padding: "5px",
              marginTop: "-35px",
              marginLeft: "70px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                fontSize: "50px",
                fontWeight: "bold",
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
                color: "black",
                marginTop: "20px",
                marginLeft: "20px",
              }}
            >
              15-50%
              <Typography
                component="span"
                sx={{
                  fontSize: "20px",
                  marginLeft: "5px",
                  marginTop: "5px",
                  color: "black",
                }}
              >
                Off
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "black",
                marginLeft: "30px",
              }}
            >
              สั่งซื้อขั้นต่ำ 50 บาท ลดสูงสุด 350 บาท
            </Typography>
            <Box
              sx={{
                border: "2px solid #ad054b",
                borderRadius: "5px",
                padding: "5px",
                backgroundColor: "rgb(255, 214, 231)",
                marginTop: "10px",
                marginLeft: "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#ad054b",
                  margin: 0,
                }}
              >
                สำหรับสมาชิกใหม่
              </Typography>
            </Box>
          </Box>
          <Button
            className={`buys-customer ${isUsed ? "used" : ""}`}
            onClick={handleCButtonClick}
            sx={{
              backgroundColor: isUsed ? "#4aabc3" : "#fc0e71",
              color: "white",
              padding: "12px 55px",
              borderRadius: "35px",
              cursor: "pointer",
              fontSize: "18px",
              marginTop: "52px",
              alignSelf: "flex-start",
              marginLeft: "110px",
              "&:hover": {
                backgroundColor: isUsed ? "#4aabc3" : "#ad054b",
              },
            }}
          >
            {buttonText}
          </Button>
        </Box>
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
              {/* กรอบป้ายลดราคา */}
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
                  🛒 เริ่มโปรตั้งแต่  {dayjs(promotion.date).format("DD/MM/YY")}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ส่วนที่ 4 คูปอง */}
      <Box
        component="img"
        src={Pro9Image}
        alt="image"
        sx={{
          width: "100%",
          maxWidth: "1100px",
          height: "auto",
          marginTop: 4,
          borderRadius: 2,
        }}
      />
      <Box
        sx={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          marginTop: "5px",
          display: "flex",
          alignItems: "center",
          width: "98%",
          maxWidth: "120%",
          marginLeft: "17px",
          backgroundColor: "white",
          boxShadow:
            "0 4px 10px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: 0,
            padding: "5px",
            marginTop: "-35px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              fontSize: "30px",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
              color: "black",
              marginTop: "30px",
            }}
          >
            โปรโมชันสำหรับลูกค้า INTERGETHER
          </Box>
        </Box>
        
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {dataproconsport.map((item) => (
          <Box
            key={item.id}
            sx={{
              border: "2px solid #ad054b",
              borderRadius: "10px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              width: "calc(50% - 20px)",
              boxSizing: "border-box",
            }}
          >
            <Box
              component="img"
              src={`http://localhost/promotion/${item.image}`} 
              alt={item.name}
              sx={{
                width: "170px",
                height: "auto",
                marginRight: "20px",
              }}
            />

            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#ad054b"
                sx={{
                  fontSize: "20px",
                  textShadow: "2px 2px 5px rgb(255, 255, 255)",
                  margin: 0,
                  borderRadius: "10px",
                  padding: "5px",
                  marginBottom: "-10px",
                  textAlign: "left",
                  marginTop: "-60px",
                  marginLeft:"-5px"
                }}
              >
                {item.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                  
                    fontWeight="bold"
                    color="black"
                    sx={{
                      fontSize: "20px",
                      marginTop: "8px",
                    }}
                  >
                    {item.description}
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
                    fontWeight="bold"
                    color="#bdbdbd"
                    sx={{
                      fontSize: "15px",
                    }}
                  >
                     
                    วันหมดอายุ: {dayjs(item.expiryDate).format("DD/MM/YY")} {/* เพิ่มข้อความวันหมดอายุ */}
                  </Typography>
                </Box>

                <Button
                     onClick={() => handleNavigation(item.link)}
                  sx={{
                    backgroundColor: "#fc0e71",
                    color: "white",
                    padding: "5px 30px",
                    borderRadius: "30px",
                    cursor: "pointer",
                    fontSize: "18px",
                    alignSelf: "flex-start",
                    marginTop: "-90px",
                    marginLeft: "190px",
                  }}
                >
                  เพิ่มเติม
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* ส่วนที่ 5 flashslse */}
      <Box
        sx={{
          border: "2px solid #ad054b",
          borderRadius: "20px 20px 0 0",
          padding: "10px",
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          background:
            "linear-gradient(to right, #f85599 40%, rgba(255, 255, 255, 0) 60%)",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="white"
            sx={{
              fontSize: "35px",
              textShadow: "2px 2px 5px rgb(255, 255, 255)",
              margin: 0,
              borderRadius: "10px",
              padding: "5px",
              marginLeft: "60px",
              display: "inline-block",
            }}
          >
            FLASH SALE
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#ad054b"
            sx={{
              fontSize: "37px",
              textShadow: "2px 2px 5px rgb(255, 255, 255)",
              margin: 0,
              borderRadius: "10px",
              padding: "5px",
              marginLeft: "20px",
              marginTop: "1px ",
              display: "inline-block",
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
        </Box>
      </Box>

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
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDirection="row"
          mt={2}
          sx={{
            overflowX: "auto", // อนุญาตให้เลื่อนในแนวนอน
            overflowY: "hidden", // ซ่อนการล้นในแนวตั้ง
            whiteSpace: "nowrap", // ป้องกันไม่ให้มีการห่อข้อความ
            padding: "10px", // เพิ่มระยะห่างภายใน
            width: "100%", // Ensure it takes full width of parent
            gap: "20px", // เพิ่มช่องว่างระหว่าง Promotion Card
          }}
        >
          {datapromotiondetail.map((flashslse) => (
            <Box
              sx={{
                flex: "0 0 auto", // ป้องกัน Card ยืดเกินไป
                maxWidth: "300px", // กำหนดความกว้างสูงสุดของ Card
                backgroundColor: "#fce4ec",
                borderRadius: "8px",
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 8px 16px #fc0e71",
                  border: "2px solid #fc0e71",
                  "& .addToCartButton": {
                    opacity: 1, // แสดงปุ่มเมื่อวางเมาส์เหนือการ์ด,
                  },
                },
              }}
            >
              <img
                src={`http://localhost/promotion/${flashslse.image}`}
                alt={flashslse.name}
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
                  {flashslse.name}
                </Typography>
                <Box
                  sx={{
                    height: "1px",
                    backgroundColor: "#ad054b",
                    margin: "5px 0",
                    width: "100%",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ textDecoration: "line-through", color: "gray" }}
                >
                  💰฿{flashslse.oldPrice}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#fc0e71" }}
                >
                  ฿{flashslse.newPrice}
                </Typography>
                <Typography variant="h5" sx={{ color: "red" }}>
                  🚨รีบกดก่อนหมดโปร🚨
                </Typography>
              </Box>
               {/* ไปหน้าproduct */}
            <Box
            className="addToCartButton"
            sx={{
              position: "absolute",
              bottom: "-25px", // ปรับค่าเพื่อเลื่อนปุ่มลงมา
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fc0e71",
                color: "white",
                fontWeight: "bold",
                padding: "8px 20px",
                "&:hover": {
                  backgroundColor: "#ad054b",
                },
              }}
              component={Link}
            to="/product"
            >
              GO PRODUCT
            </Button>
          </Box>
            </Box>
          ))}
        </Box>
        
      </Box>
    </Box>
  );
};

export default Promotion;
