import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SeatSport: React.FC = () => {
  const location = useLocation();
  const { price, label } = location.state || {}; // รับข้อมูลทั้งราคาและชื่อโซน (label)
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; col: number }[]
  >([]); // เปลี่ยนให้เป็น array เพื่อเก็บหลายที่นั่ง

  const [timeLeft, setTimeLeft] = useState(5 * 60); // ตัวแปรเวลาที่เหลือในการทำรายการ 5 นาที (5 * 60 วินาที)

  // แปลง price จาก string เช่น "฿2,500" ให้เป็นตัวเลข
  const numericPrice = parseFloat(price.replace(/[^\d.-]/g, "")); //จะลบอักขระที่ไม่ใช่ตัวเลขหรือเครื่องหมายจุดทศนิยมออก (เช่น "฿", ",", เป็นต้น)

  // สถานะที่นั่ง
  const [seats, setSeats] = useState(
    Array(10).fill(Array(10).fill("available")) // สร้างแผนที่ที่นั่งขนาด 10x10 เริ่มต้นให้ที่นั่งทั้งหมดเป็นสถานะ "ว่าง" (available)
  );

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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // ฟังก์ชันสำหรับเปลี่ยนสถานะของที่นั่งเมื่อมีการคลิก
  const toggleSeatStatus = (rowIndex: number, colIndex: number) => {
    const seatPosition = { row: rowIndex + 1, col: colIndex + 1 };
    setSeats((prevSeats) =>
      prevSeats.map((row, rIndex) =>
        row.map((seat: string, cIndex: number) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            if (seat === "available") {
              setSelectedSeats((prevSelectedSeats) => [
                ...prevSelectedSeats,
                seatPosition,
              ]); // เพิ่มที่นั่งที่เลือก
              return "selected";
            } else if (seat === "selected") {
              setSelectedSeats((prevSelectedSeats) =>
                prevSelectedSeats.filter(
                  (selectedSeat) =>
                    !(
                      selectedSeat.row === rowIndex + 1 &&
                      selectedSeat.col === colIndex
                    )
                )
              ); // ลบที่นั่งที่ยกเลิกการเลือก
              return "available";
            }
          }
          return seat;
        })
      )
    );
  };
  const navigate = useNavigate(); // เรียกใช้ useNavigate
  // ฟังก์ชันสำหรับการไปที่หน้า Payment
  const handleBuyTicket = () => {
    navigate("payment-sport", {
      state: {
        price,
        label,
        selectedSeats,
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
        height: "800px",
        padding: "20px",
        maxHeight: "none",
        width: "1150px",
        maxWidth: "none",
      }}
    >
      {/* Sidebar ซ้าย */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "505px",
          mr: 2,
        }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: "20px", fontWeight: "bold", fontSize: "25px" }}
          >
            {" "}
            รายละเอียดการจองโซนที่นั่ง: {label}{" "}
          </Typography>
          <Typography
            variant="h6"
            sx={{ marginBottom: "10px", textAlign: "left", color: "red" }}
          >
            {" "}
            บัตรโซนที่นั่งราคา: {price} บาท{" "}
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
                {" "}
                {label}{" "}
              </Box>
            </Typography>
          )}

          {/* แสดงที่นั่งที่เลือก */}
          {selectedSeats.length > 0 && (
            <Typography
              variant="h6"
              sx={{
                color: "black",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap", // เพิ่ม flexWrap เพื่อทำให้ที่นั่งไหลลงบรรทัดถัดไป
                width: "100%", // ให้แน่ใจว่า width ใช้งานได้เต็มที่
              }}
            >
              ที่นั่ง:
              {selectedSeats.map((seat, index) => (
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
                    marginBottom: "10px", // เพิ่มระยะห่างระหว่างแถว
                  }}
                >
                  {`${label}${seat.row}-${seat.col}`}
                </Box>
              ))}
            </Typography>
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
              {" "}
              ยืนยันการจองที่นั่ง{" "}
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

            {/* ที่นั่งที่ชำระเงินแล้ว */}
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CloseIcon style={{ color: "red" }} />
              </Box>
              <Typography variant="body2" sx={{ color: "black", mt: 1 }}>
                ที่นั่งที่ชำระเงินแล้ว
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            backgroundColor: "#80cbc4",
            color: "white",
            padding: "20px 30px",
            textAlign: "center",
            borderRadius: "12px",
            width: "90%",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
            mt: 3,
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
          {seats.map((row, rowIndex) =>
            row.map((seat: string, colIndex: number) => (
              <Box
                key={`${rowIndex}-${colIndex}`}
                onClick={() => toggleSeatStatus(rowIndex, colIndex)}
                sx={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    seat === "available"
                      ? "#00AEEF"
                      : seat === "selected"
                      ? "#00FF00"
                      : "#C0C0C0",
                  cursor:
                    seat === "available" || seat === "selected"
                      ? "pointer"
                      : "default",
                }}
              >
                {seat === "selected" && (
                  <CheckIcon style={{ color: "black", fontSize: "20px" }} />
                )}
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SeatSport;
