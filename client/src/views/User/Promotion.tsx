import React, { useEffect, useState } from "react";
import { Box, Button, keyframes, Typography } from "@mui/material";
import ProImage from "/src/assets/promotion/promotion.webp";
import Pro1Image from "/src/assets/promotion/pro1.webp";
import Pro2Image from "/src/assets/promotion/pro2.webp";
import Pro3Image from "/src/assets/promotion/pro9.png";
import Pro4Image from "/src/assets/promotion/pro4.png";
import Pro5Image from "/src/assets/promotion/pro5.png";
import Pro6Image from "/src/assets/promotion/pro6.png";
import Pro7Image from "/src/assets/promotion/pro7.png";
import Pro8Image from "/src/assets/promotion/pro8.png";
import Pro9Image from "/src/assets/promotion/promo.webp";
import Pro10Image from "/src/assets/promotion/proo.png";
import cat from "/src/assets/promotion/cat.png";
import { useNavigate } from "react-router-dom";

//ส่วนที่1
const promotionsData = [
  {
    discount: "ลด 35%",
    image: Pro3Image,
    title: "POP MART ",
    oldPrice: 2250,
    newPrice: 1200,
    dates: "19-25 ตุลาคม 67",
  },
  {
    discount: "ลด 20%",
    image: Pro4Image,
    title: "สินค้าพิเศษ",
    oldPrice: 700,
    newPrice: 560,
    dates: "20-25 ตุลาคม 67",
  },
  {
    discount: "ลด 25%",
    image: Pro5Image,
    title: "ของเล่นใหม่",
    oldPrice: 500,
    newPrice: 375,
    dates: "21-26 ตุลาคม 67",
  },
  {
    discount: "ลด 15%",
    image: Pro6Image,
    title: "สินค้าใหม่",
    oldPrice: 600,
    newPrice: 510,
    dates: "22-27 ตุลาคม 67",
  },
  {
    discount: "ลด 40%",
    image: Pro7Image,
    title: "สินค้าแนะนำ",
    oldPrice: 800,
    newPrice: 480,
    dates: "23-28 ตุลาคม 67",
  },
  {
    discount: "ลด 30%",
    image: Pro8Image,
    title: "ของเล่นสไตล์",
    oldPrice: 1000,
    newPrice: 700,
    dates: "24-29 ตุลาคม 67",
  },
];

const PromotionCard = ({ promotion }) => (
  <Box
    sx={{
      width: "800px", // เพิ่มความกว้างของกรอบเป็น 800px
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: 2,
      marginRight: "20px", // ระยะห่างระหว่าง Card
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // จัดรายการให้กลางในแนวตั้ง
      position: "relative", // เพื่อให้สามารถจัดตำแหน่งป้ายลดราคา
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
      src={promotion.image}
      alt={promotion.title}
      style={{
        width: "100%", // รักษาขนาดภาพให้เต็มกรอบ
        height: "auto", // ปรับความสูงให้เป็นอัตโนมัติเพื่อรักษาสัดส่วน
        maxHeight: "300px", // กำหนดความสูงสูงสุดสำหรับรูปภาพ
        objectFit: "cover",
        borderRadius: "8px 8px 0 0",
      }}
    />
    <Box sx={{ padding: "10px", textAlign: "center" }}>
      <Typography fontSize={25} sx={{ fontWeight: "bold", color: "#ad054b" }}>
        {promotion.title}
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
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fc0e71" }}>
        ฿{promotion.newPrice}
      </Typography>
      <Typography variant="h6" sx={{ color: "#888" }}>
        🛒 เริ่มโปรตั้งแต่ {promotion.dates}
      </Typography>
    </Box>
  </Box>
);

const promotionsFlash = [
  {
    image: Pro3Image,
    title: "POP MART ",
    oldPrice: 2250,
    newPrice: 1200,
  },
  {
    image: Pro4Image,
    title: "สินค้าพิเศษ",
    oldPrice: 700,
    newPrice: 560,
  },
  {
    image: Pro5Image,
    title: "ของเล่นใหม่",
    oldPrice: 500,
    newPrice: 375,
  },
  {
    image: Pro6Image,
    title: "สินค้าใหม่",
    oldPrice: 600,
    newPrice: 510,
  },
  {
    image: Pro7Image,
    title: "สินค้าแนะนำ",
    oldPrice: 800,
    newPrice: 480,
  },
  {
    image: Pro8Image,
    title: "ของเล่นสไตล์",
    oldPrice: 1000,
    newPrice: 700,
  },
];

const PromotionCardFlash = ({ flashslse }) => (
  <Box
  sx={{
    width: "800px",
    height:"360px",
    backgroundColor: "#fce4ec",
    borderRadius: "8px",
    boxShadow: 2,
    marginRight: "20px",
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
        opacity: 1, // แสดงปุ่มเมื่อวางเมาส์เหนือการ์ด
      },
    },
  }}
>
  <img
    src={flashslse.image}
    alt={flashslse.title}
    style={{
      width: "100%",
      height: "auto",
      maxHeight: "300px",
      objectFit: "cover",
      borderRadius: "8px 8px 0 0",
    }}
  />
  <Box sx={{ padding: "10px", textAlign: "center" }}>
    <Typography fontSize={25} sx={{ fontWeight: "bold", color: "#ad054b" }}>
      {flashslse.title}
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
    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fc0e71" }}>
      ฿{flashslse.newPrice}
    </Typography>
    <Typography variant="h5" sx={{ color: "red" }}>
      🚨รีบกดก่อนหมดโปร🚨
    </Typography>
  </Box>
  
  {/* ปุ่มหยิบใส่ตะกร้า */}
  <Box
  className="addToCartButton"
  sx={{
    position: "absolute",
    bottom: "-10px", // ปรับค่าเพื่อเลื่อนปุ่มลงมา
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
  >
    หยิบใส่ตะกร้า
  </Button>
</Box>

</Box>

);

const Promotion: React.FC = () => {

  const navigate = useNavigate();

  const handleButtonPouClick = () => {
    navigate("/coupon-conditions"); // ไปยังหน้าเงื่อนไขคูปอง
  };

  const images = [ProImage, Pro1Image, Pro2Image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ฟังก์ชันที่เปลี่ยนข้อความและสีเมื่อคลิกปุ่ม
  const handleCButtonClick = () => {
    setButtonText("ใช้ทันที");
    setIsUsed(true); // เปลี่ยนสถานะว่าคูปองถูกใช้แล้ว
  };

  const [isUsed, setIsUsed] = useState(false);
  const [buttonText, setButtonText] = useState("เก็บคูปอง");
  // สร้าง state เพื่อเก็บสถานะการใช้คูปองสำหรับแต่ละรายการ
  const [usedCoupons, setUsedCoupons] = useState({});

  // ฟังก์ชันที่เปลี่ยนข้อความและสีเมื่อคลิกปุ่ม
  const handleButtonClick = (id) => {
    // อัพเดทสถานะการใช้คูปอง
    setUsedCoupons((prev) => ({
      ...prev,
      [id]: true, // ตั้งค่าคูปองว่าใช้แล้ว
    }));
  };
  //การแสดงจุด และเวลา
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  // สร้างแอนิเมชัน pulse
  const pulseAnimation = keyframes`
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    `;

  const items = [
    {
      id: 1,
      price: "฿220",
      description: "สั่งซื้อตั้งแต่ ฿1600",
      imgSrc: Pro10Image,
      expiryDate: "2024.10.31",
    },
    {
      id: 2,
      price: "฿220",
      description: "สั่งซื้อตั้งแต่ ฿1600",
      imgSrc: Pro10Image,
      expiryDate: "2024.10.31",
    },
    {
      id: 3,
      price: "฿220",
      description: "สั่งซื้อตั้งแต่ ฿1600",
      imgSrc: Pro10Image,
      expiryDate: "2024.10.31",
    },
    {
      id: 4,
      price: "฿220",
      description: "สั่งซื้อตั้งแต่ ฿1600",
      imgSrc: Pro10Image,
      expiryDate: "2024.10.31",
    },
  ];

  //นับถอยหลัง
  const targetTime = new Date();
  targetTime.setHours(targetTime.getHours() + 3); // เริ่มนับถอยหลังจาก 3 ชั่วโมง

  const calculateTimeLeft = () => {
    const difference = targetTime - new Date();
    return Math.max(Math.floor(difference / 1000), 0); // คำนวณเวลาที่เหลือในหน่วยวินาที
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")} น.`; // รูปแบบเวลา
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      width={1140}
      sx={{
        background: "linear-gradient(135deg, #EECDA3 0%, #EF629F 100%);",
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

      {/* ส่วนที่ 1  รูปภาพเลื่อน*/}
      <Box
        sx={{
          position: "relative",
          height: "auto",
          overflow: "hidden",
        }}
      >
        <img
          src={images[currentImageIndex]}
          alt="promotion"
          className="pro-image"
          style={{
            width: "98%",
            height: "auto",
            objectFit: "cover",
            transition: "transform 0.5s ease-in-out",
            transform: "scale(1.05)",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor:
                currentImageIndex === index ? "rgb(207, 8, 147)" : "gray",
              margin: "0 5px",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
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
            animation: `${pulseAnimation} 2s infinite`, // ใช้แอนิเมชัน pulse
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
              marginLeft: "140px",
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
          }}
        >
          {promotionsData.map((promotion, index) => (
            <PromotionCard key={index} promotion={promotion} />
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
            เติมคูปอง ทุกเที่ยงคืน 00.00 น.
          </Box>
        </Box>
        <Button
      onClick={handleButtonPouClick}
      sx={{
        backgroundColor: "#fc0e71",
        color: "white",
        padding: "12px 55px",
        cursor: "pointer",
        fontSize: "18px",
        alignSelf: "flex-start",
        marginLeft: "420px",
      }}
    >
      เงื่อนไขคูปอง
    </Button>
        
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
        {items.map((item) => (
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
              src={item.imgSrc}
              alt="cat"
              sx={{
                width: "150px",
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
                  fontSize: "35px",
                  textShadow: "2px 2px 5px rgb(255, 255, 255)",
                  margin: 0,
                  borderRadius: "10px",
                  padding: "5px",
                  marginBottom: "-10px",
                  textAlign: "left",
                  marginTop: "-50px",
                }}
              >
                {item.price}
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
                    variant="h6"
                    fontWeight="bold"
                    color="black"
                    sx={{
                      fontSize: "20px",
                      marginBottom: "5px",
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
                    variant="h6"
                    fontWeight="bold"
                    color="#bdbdbd"
                    sx={{
                      fontSize: "20px",
                    }}
                  >
                    วันหมดอายุ: {item.expiryDate} {/* เพิ่มข้อความวันหมดอายุ */}
                  </Typography>
                </Box>

                <Button
                  className={`buys-customer ${
                    usedCoupons[item.id] ? "used" : ""
                  }`}
                  onClick={() => handleButtonClick(item.id)}
                  sx={{
                    backgroundColor: usedCoupons[item.id]
                      ? "#4aabc3"
                      : "#fc0e71",
                    color: "white",
                    padding: "5px 30px",
                    borderRadius: "35px",
                    cursor: "pointer",
                    fontSize: "18px",
                    alignSelf: "flex-start",
                    marginTop: "-100px",
                    marginLeft: "210px",
                    "&:hover": {
                      backgroundColor: usedCoupons[item.id]
                        ? "#4aabc3"
                        : "#ad054b",
                    },
                  }}
                >
                  {usedCoupons[item.id] ? "ใช้แล้ว" : "ใช้คูปอง"}
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
          mt={4}
          sx={{
            overflowX: "auto", // อนุญาตให้เลื่อนในแนวนอน
            overflowY: "hidden", // ซ่อนการล้นในแนวตั้ง
            whiteSpace: "nowrap", // ป้องกันไม่ให้มีการห่อข้อความ
            padding: "10px", // เพิ่มระยะห่างภายใน
            width: "100%", // Ensure it takes full width of parent
            marginTop: "5px",
          }}
        >
          {promotionsFlash.map((flashslse, index) => (
            <PromotionCardFlash key={index} flashslse={flashslse} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Promotion;
