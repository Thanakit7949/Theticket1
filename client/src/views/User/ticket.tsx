import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check"; // นำเข้าไอคอนเครื่องหมายถูก
import CloseIcon from "@mui/icons-material/Close";

const StdPage: React.FC = () => {
  const location = useLocation();
  const { price, label } = location.state || {}; // รับข้อมูลทั้งราคาและชื่อโซน (label)
  const [selectedSeat, setSelectedSeat] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [timeLeft, setTimeLeft] = useState(5 * 60);

  // สถานะที่นั่ง
  const [seats, setSeats] = useState(
    Array(10).fill(Array(10).fill("available")) // สร้างที่นั่งขนาด 10x10 ที่ทั้งหมดเป็นที่นั่งว่าง
  );

  // อัปเดตตัวจับเวลาให้ทำงานทุก ๆ 1 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // ลดเวลาลงทีละ 1 วินาที หยุดเมื่อถึง 0
    }, 1000);

    // ล้าง interval เมื่อคอมโพเนนต์ถูกยกเลิก
    return () => clearInterval(interval);
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
  const toggleSeatStatus = (rowIndex: number, colIndex: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((row, rIndex) =>
        row.map((seat: string, cIndex: number) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            if (seat === "available") {
              setSelectedSeat({ row: rowIndex + 1, col: colIndex + 1 }); // บันทึกตำแหน่งที่นั่งที่เลือก
              return "selected";
            } else if (seat === "selected") {
              setSelectedSeat(null); // ยกเลิกการเลือกที่นั่ง
              return "available";
            }
          }
          return seat;
        })
      )
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // ใช้แสดงคอนเทนต์ในแถว
        alignItems: "flex-start",
        backgroundColor: "#FFD5E5",
        minHeight: "100vh",
        padding: "20px",
        width: "1150px", // เพิ่มความยาวของกรอบ
        maxWidth: "none", // กำหนดให้ไม่มีขนาดกว้างสุดที่จำกัด
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
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            รายละเอียดการจองโซนที่นั่ง: {label}{" "}
            {/* แสดงชื่อโซนที่ผู้ใช้เลือก */}
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            บัตรโซนที่นั่งราคา: {price} {/* แสดงราคาที่ผู้ใช้เลือก */}
          </Typography>
          {/* แสดงตำแหน่งที่นั่งที่เลือก */}
          <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
            {selectedSeat
              ? `คุณเลือกที่นั่ง: แถว ${selectedSeat.row} ที่นั่ง ${selectedSeat.col}`
              : "ยังไม่ได้เลือกที่นั่ง"}
          </Typography>
        </Box>
        {/* Tickets List */}
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
          เวลาที่ทำรายการ:{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {formatTime(timeLeft)}
          </span>
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
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(10, 40px)", gap: "10px", mt: 3 }}>
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
                  seat === "available" ? "#00AEEF" : seat === "selected" ? "#00FF00" : "#C0C0C0",
                cursor: seat === "available" || seat === "selected" ? "pointer" : "default",
              }}
            >
              {seat === "selected" && <CheckIcon style={{ color: "black", fontSize: "20px" }} />}
            </Box>
          ))
        )}
      </Box>
      </Box>
    </Box>
  );
};

export default StdPage;
