import React, { useEffect, useState } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate

const StageSport: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [selectedPrice,] = useState<string | null>(null);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate(); // ประกาศใช้ navigate

  // อัปเดตตัวจับเวลาให้ทำงานทุก ๆ 1 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // ลดเวลาลงทีละ 1 วินาที หยุดเมื่อถึง 0
    }, 1000);

    // ล้าง interval เมื่อคอมโพเนนต์ถูกยกเลิก
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch("http://localhost:5000/getSportstage"); // ตรวจสอบ URL ให้ถูกต้อง
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTickets(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchTicket();
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

  // กรองบัตรตามราคาที่เลือก
  const filteredTickets = selectedPrice
    ? tickets.filter((ticket) => ticket.amount === selectedPrice)
    : tickets;

  const handleBuyTicket = (price: string, label: string) => {
    navigate("/sport/seat-sport", { state: { price, label } });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // ใช้แสดงคอนเทนต์ในแถว
        alignItems: "flex-start",
        background: "linear-gradient(135deg, #EECDA3 0%, #EF629F 100%);",
        minHeight: "100vh",
        padding: "20px",
        width: "1150px", // เพิ่มความยาวของกรอบ
        height: "1100px",
        maxHeight: "none",
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
        {/* Tickets List */}
        <Box
          sx={{
            width: "100%",
            padding: "20px",
            borderRadius: "30px",
            backgroundColor: "#FFF",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            mb: 3,
          }}
        >
          {filteredTickets.map((ticket, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: ticket.color,
                color: "white",
                borderRadius: "30px",
                padding: "12px",
                marginBottom: "8px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography>{ticket.label}: Cenzonic Concert</Typography>
              <Typography>{ticket.price}</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "8px 16px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#5e35b1", color: "white" },
                }}
                onClick={() => handleBuyTicket(ticket.price, ticket.label)} // ส่งทั้งราคาและชื่อโซน
              >
                จองโซนที่นั่ง
              </Button>
            </Box>
          ))}
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
          position: "relative", // Relative positioning for the stage
        }}
      >
        <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
          เวลาที่ทำรายการ:{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {formatTime(timeLeft)}
          </span>
        </Typography>
        {/* Stage Label */}
        <Box
          sx={{
            position: "absolute", // ใช้ position absolute เพื่อให้อยู่ตรงกลาง
            top: "54.5%", // วางตรงกลางในแนวตั้ง
            left: "50%", // วางตรงกลางในแนวนอน
            transform: "translate(-50%, -50%)", // เพื่อปรับให้จุดศูนย์กลางตรง
            backgroundColor: "#80cbc4",
            width: "250px", // ขนาดวงกลม
            height: "250px", // ขนาดวงกลม
            borderRadius: "50%", // ทำให้เป็นวงกลม
            display: "flex",
            justifyContent: "center", // จัดข้อความให้อยู่กลาง
            alignItems: "center", // จัดข้อความให้อยู่กลาง
            fontWeight: "bold",
            textAlign: "center",
            border: "1px solid white",
            color: "white",
            padding: "15px 30px",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
            fontSize:"30px"
          }}
        >
          STAGE
        </Box>

        {/* Seating Arrangement */}
        <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
    height: "500px",
    border: "1px solid black",
  }}
>
  {/* Map over seating labels to create a semicircular arrangement */}
  {["AA1", "AA2", "AA3", "AA4", "AA5", "AA6","AA7" ,"AA8", "AA9", "AA10", ].map((label, index) => {
    const angle = (180 / 5) * index; // Adjust to 180 degrees for half circle
    return (
      <Tooltip
        key={label}
        title={
          tickets.find((ticket) => ticket.label === label)?.price || ""
        }
        arrow
      >
        <Box
          onClick={() => {
            const ticket = tickets.find(
              (ticket) => ticket.label === label
            );
            navigate("/sport/seat-sport", {
              state: { price: ticket?.price, label },
            });
          }}
          sx={{
            backgroundColor: "#7986cb",
            color: "white",
            padding: "25px 35px",
            borderRadius: "10px",
            minWidth: "100px",
            textAlign: "center",
            fontSize: "18px",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(200px) rotate(-${angle}deg)`, // Create a half-circle effect
            transition: "transform 0.2s ease, box-shadow 0.2s ease", // Add transition effect
            "&:hover": {
              transform: `scale(1.1) translate(-50%, -50%) rotate(${angle}deg) translateX(200px) rotate(-${angle}deg)`,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Add shadow on hover
            },
          }}
        >
          {label} {/* Display zone label */}
        </Box>
      </Tooltip>
    );
  })}
</Box>

      </Box>
    </Box>
  );
};

export default StageSport;
