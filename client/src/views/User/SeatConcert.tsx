/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import Cookies from "js-cookie";

const SeatConcert: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, label,} = location.state || {}; // รับข้อมูลทั้งราคาและชื่อโซน (label)
  const [timeLeft, setTimeLeft] = useState(5 * 60); // ตัวแปรเวลาที่เหลือในการทำรายการ 5 นาที (5 * 60 วินาที)
  const concert_Zone = location.state;
  const [seats, setSeats] = useState<string[]>([]); // เก็บข้อมูลที่นั่งในรูปแบบ 1D array เช่น ["A1", "A2", "A3", ...]
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // เก็บที่นั่งที่เลือกเป็น string array

  useEffect(() => {
    if (!location.state) {
      console.log("ไม่มีข้อมูล state ที่ถูกส่งมา");
    } else {
      console.log("concert_Zone:", concert_Zone);
    }
  }, [location.state, concert_Zone]);

  useEffect(() => {
    if (!concert_Zone.zone) {
      console.error("ไม่มีข้อมูลโซน");
      return;
    }
    console.log(`ดึงข้อมูลที่นั่งจาก API: http://localhost:5000/api/seats/${concert_Zone.zone.id}`);
    fetch(`http://localhost:5000/api/seats/${concert_Zone.zone.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("ข้อมูลที่นั่งจากฐานข้อมูล:", data);
        // สมมุติว่า data ที่ได้มาจะเป็นอาร์เรย์ของที่นั่ง เช่น ["A1", "A2", "A3", ..., "A20"]
        setSeats(data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลที่นั่ง:", error);
      });
  }, [concert_Zone.zone]);

  // ฟังก์ชันสำหรับเลือกที่นั่ง
  const toggleSeatStatus = (seat: string) => {
    setSelectedSeats((prevSelected) => {
      const exists = prevSelected.includes(seat);
      if (exists) {
        return prevSelected.filter((s) => s !== seat);
      } else {
        return [...prevSelected, seat];
      }
    });
    console.log(selectedSeats)
  };



  // แปลง price จาก string เช่น "฿2,500" ให้เป็นตัวเลข
  const numericPrice = parseFloat(price.replace(/[^\d.-]/g, "")); //จะลบอักขระที่ไม่ใช่ตัวเลขหรือเครื่องหมายจุดทศนิยมออก (เช่น "฿", ",", เป็นต้น)

  // อัปเดตตัวจับเวลาให้ทำงานทุก ๆ 1 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // ลดเวลาลงทีละ 1 วินาทีจนกว่าจะถึง 0
    }, 1000);

    return () => clearInterval(interval); // ล้าง interval เมื่อคอมโพเนนต์ถูกยกเลิก
  }, []);

  // ฟังก์ชันสำหรับฟอร์แมตเวลาเป็นรูปแบบ MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

// คำนวณราคารวมสุทธิ
const totalPrice = selectedSeats.length > 0
  ? (
      numericPrice * selectedSeats.length + // ราคารวม
      numericPrice * selectedSeats.length * 0.07 + // ค่าบริการ (VAT)
      numericPrice * selectedSeats.length * 0.07 * 1.07 // ค่าธรรมเนียมการชำระเงิน (VAT)
    ).toFixed(2)
  : 0;  // ถ้าไม่ได้เลือกที่นั่ง ก็จะได้ราคารวมเป็น 0

  const updateSeatsInDatabase = async () => {
    try {
      await Promise.all(
        selectedSeats.map(async (seatNumber) => {
          console.log(seatNumber);
          const response = await fetch("http://localhost:5000/api/update-seat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              seatNumber: seatNumber,  // เปลี่ยนเป็น seatNumber
              status: 1,
            }),
          });
  
          // ดูรายละเอียดของการตอบกลับจาก API
          console.log("response:", response);
  
          if (!response.ok) {
            const errorData = await response.json();
            console.error("ข้อผิดพลาดในการอัปเดตที่นั่ง:", errorData);
            alert("ไม่สามารถอัปเดตที่นั่งในฐานข้อมูลได้");
          } else {
            console.log("อัปเดตที่นั่งสำเร็จ:", seatNumber);
          }
        })
      );
  
      console.log("ที่นั่งถูกอัปเดตในฐานข้อมูลเรียบร้อย");
    } catch (error) {
      console.error("ข้อผิดพลาดในการอัปเดตที่นั่ง:", error);
      alert("ไม่สามารถอัปเดตที่นั่งในฐานข้อมูลได้");
    }
  };
  
  const updateSeatsInDatabasebooking = async () => {
    console.log('totalPrice',totalPrice)
    try {
      const response = await fetch("http://localhost:5000/api/book-seats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Cookies.get('userid'), // ตัวอย่าง userId, สามารถเปลี่ยนเป็นค่าจาก session หรือข้อมูลผู้ใช้จริง
          concertId: concert_Zone.zone.concert_id, // concert_id ที่เลือก
          zoneId: concert_Zone.zone.id, // zone_id ที่เลือก
          selectedSeats: selectedSeats, // ที่นั่งที่เลือก
          total_price: totalPrice,
        }),
      });
  
      if (response.ok) {
        console.log("ที่นั่งถูกจองสำเร็จ");
      } else {
        console.error("ไม่สามารถจองที่นั่งได้");
        alert("ไม่สามารถจองที่นั่งได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการจองที่นั่ง:", error);
      alert("เกิดข้อผิดพลาดในการจองที่นั่ง");
    }
  };
  
  const handleBuyTicket = async () => {
    await updateSeatsInDatabase(); // อัปเดตสถานะที่นั่งก่อน
    await updateSeatsInDatabasebooking(); // อัปเดตสถานะที่นั่งก่อน
    navigate("payment-concert", {
      state: {
        price,
        label,
        selectedSeats,
        concert_Zone
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        background: "linear-gradient(135deg, #EECDA3 0%, #EF629F 100%);",
        height: "700px",
        padding: "20px",
        maxHeight: "none",
        width: "1150px",
        maxWidth: "none",
        borderRadius:"15px",
      }}
    >
      {/* Sidebar ซ้าย */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "405px", mr: 2 }}>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", fontSize: "25px" }}>
            รายละเอียดการจองโซนที่นั่ง: 
          </Typography >
          <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", fontSize: "25px" }}>
          {label}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "10px", textAlign: "left", color: "red" }}>
            บัตรโซนที่นั่งราคา: {price} บาท
          </Typography>

          {/* แสดงโซนเมื่อเลือกที่นั่ง */}
          {selectedSeats.length > 0 && (
            <Typography
              variant="h6"
              sx={{
                color: "black",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              โซน:
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#b39ddb",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {label}
              </Box>
            </Typography>
          )}

          {/* แสดงที่นั่งที่เลือก */}
          {selectedSeats.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
                maxHeight: "150px",
                overflowY: "auto",
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              ที่นั่ง:
              {selectedSeats.map((seat:any, index:number) => (
                <Box
                  key={index}
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#00FF00",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {`${seat}`}
                </Box>
              ))}
            </Box>
          )}

          {/* แสดงราคา */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 22,
              padding: "12px 16px",
              borderRadius: "30px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="body1" fontWeight="bold" color="black">
              {selectedSeats.length > 0
                ? `ราคารวม: ฿${numericPrice * selectedSeats.length}`
                : "กรุณาเลือกที่นั่ง"}
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: "white",
                padding: "8px 16px",
                borderRadius: "30px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "darkred" },
              }}
              onClick={handleBuyTicket}
              disabled={selectedSeats.length === 0}
            >
              ยืนยันการจองที่นั่ง
            </Button>
          </Box>
        </Box>
      </Box>

      {/* แผนที่ที่นั่ง */}
      <Box
        sx={{
          width: "740px",
          maxWidth: "none",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "#FFF",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
          {" "}
          เวลาที่ทำรายการ:{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {" "}
            {formatTime(timeLeft)}{" "}
          </span>{" "}
        </Typography>
        {/* ตำนานสถานะที่นั่ง */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            mt: 2,
          }}
        >
          {/* ที่นั่งว่าง */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              mt: 2,
            }}
          >
            {/* ที่นั่งว่าง */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#00AEEF",
                  borderRadius: "5px",
                  mr: "15px",
                }}
              />
              <Typography variant="body2" sx={{ color: "black", mt: 1, mr: 2 }}>
                ที่นั่งว่าง
              </Typography>
            </Box>

            {/* ที่นั่งที่เลือก */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#00FF00",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckIcon style={{ color: "black", fontSize: "20px" }} />{" "}
                {/* ใส่ไอคอนเครื่องหมายถูก */}
              </Box>
              <Typography variant="body2" sx={{ color: "black", mt: 1 }}>
                ที่นั่งที่เลือก
              </Typography>
            </Box>

            {/* ที่นั่งถูกจองแล้ว */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#C0C0C0",
                  borderRadius: "5px",
                }}
              />
              <Typography variant="body2" sx={{ color: "black", mt: 1 }}>
                ที่นั่งถูกจองแล้ว
              </Typography>
            </Box>

          </Box>
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            backgroundColor: "#d81b60",
            color: "white",
            padding: "20px",
            width: "90%",
            maxWidth: "none",
            minHeight: "100px",
            textAlign: "center",
            lineHeight: "2.5",
            mt: 3
          }}
        >
          STAGE
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 40px)",
            gap: "10px",
            mt: 3,
          }}
        >
          {seats.map((seat:any) => {
            const isReserved = seat.is_reserved === 1; // ตรวจสอบว่า seat ถูกจองแล้วหรือไม่

            return (
              <Box
                key={seat}
                onClick={() => !isReserved && toggleSeatStatus(seat.seat_number)} // ถ้าไม่ถูกจองแล้วให้กดได้
                sx={{
                  width: "40px",
                  height: "40px",
                  backgroundColor:
                    selectedSeats.includes(seat.seat_number)
                      ? "#00FF00"
                      : isReserved
                        ? "#C0C0C0"
                        : "#00AEEF",
                  borderRadius: "5px",
                  cursor: isReserved ? "not-allowed" : "pointer", // ป้องกันการคลิกที่นั่งที่จองแล้ว
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {selectedSeats.includes(seat.seat_number) && <CheckIcon style={{ color: "black" }} />}
              </Box>
            );
          })}

        </Box>
      </Box>
    </Box>
  );
};
export default SeatConcert;
