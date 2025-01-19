/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button, Stack,  Tooltip,  Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StageConcert: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch("http://localhost:5000/getConcertstage");
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const filteredTickets = selectedPrice
  ? tickets.filter((ticket) => String(ticket.amount) === selectedPrice) // ใช้ String เพื่อความแม่นยำ
  : tickets;


  const handleBuyTicket = (price: string, label: string) => {
    navigate("/concert/seat-concert", { state: { price, label } });
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
      height:"1100px",
      maxHeight:"none",
      maxWidth: "none", // กำหนดให้ไม่มีขนาดกว้างสุดที่จำกัด
    }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "505px",
          mr: 2,
        }}
      >
        <Stack direction="row" spacing={2} mb={3}>
          <Button
            variant="contained"
            onClick={() => setSelectedPrice("2500")}
            sx={{
              backgroundColor: "#2D2DFF",
              color: "white",
              borderRadius: "30px",
              width: "100px",
            }}
          >
            ฿2,500
          </Button>
          <Button
            variant="contained"
            onClick={() => setSelectedPrice("3500")}
            sx={{
              backgroundColor: "#4DC0FF",
              color: "white",
              borderRadius: "30px",
              width: "100px",
            }}
          >
            ฿3,500
          </Button>
          <Button
            variant="contained"
            onClick={() => setSelectedPrice("4500")}
            sx={{
              backgroundColor: "#FFD96A",
              color: "white",
              borderRadius: "30px",
              width: "100px",
            }}
          >
            ฿4,500
          </Button>
          <Button
            variant="contained"
            onClick={() => setSelectedPrice("5500")}
            sx={{
              backgroundColor: "#FF66A4",
              color: "white",
              borderRadius: "30px",
              width: "100px",
            }}
          >
            ฿5,500
          </Button>
        </Stack>

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
                  "&:hover": { backgroundColor: "#b39ddb", color: "white" },
                }}
                onClick={() => handleBuyTicket(ticket.price, ticket.label)}
              >
                จองโซนที่นั่ง
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

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

        {/* Stage Label */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            backgroundColor: "#f48fb1",
            color: "black",
            padding: "20px",

            width: "90%",
            maxWidth: "none",
            minHeight: "100px",
            textAlign: "center",
            lineHeight: "2.5",
            mb: 3,
            border: "3px solid black",
          }}
        >
          STAGE
        </Typography>

        {/* Seating Arrangement */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* Front Row (AA Section) */}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}
          >
            {["AA1", "AA2", "AA3"].map((label) => (
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
                    // ส่งข้อมูลไปยังหน้า seat-concert พร้อมกับชื่อโซน (label) และราคา
                    navigate("/concert/seat-concert", {
                      state: { price: ticket?.price, label },
                    });
                  }}
                  sx={{
                    backgroundColor: "#FF66A4",
                    color: "white",
                    padding: "25px 50px",
                    borderRadius: "10px",
                    minWidth: "100px",
                    textAlign: "center",
                    fontSize: "18px",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease", // การเพิ่ม transition
                    "&:hover": {
                      transform: "scale(1.1)", // เพิ่มขนาดเมื่อเมาส์อยู่บนปุ่ม
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // เพิ่มเงาหลัง
                    },
                  
                  }}
                >
                  {label} {/* แสดงชื่อโซน */}
                </Box>
              </Tooltip>
            ))}
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}
          >
            {["AA4", "AA5", "AA6"].map((label) => (
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
                 // ส่งข้อมูลไปยังหน้า seat-concert พร้อมกับชื่อโซน (label) และราคา
                 navigate("/concert/seat-concert", {
                   state: { price: ticket?.price, label },
                 });
               }}
               sx={{
                 backgroundColor: "#FFD96A",
                 color: "white",
                 padding: "25px 55px",
                 borderRadius: "10px",
                 minWidth: "100px",
                 textAlign: "center",
                 fontSize: "18px",
                 cursor: "pointer",
                 transition: "transform 0.2s ease, box-shadow 0.2s ease", // การเพิ่ม transition
                 "&:hover": {
                   transform: "scale(1.1)", // เพิ่มขนาดเมื่อเมาส์อยู่บนปุ่ม
                   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // เพิ่มเงาหลัง
                 },
               }}
             >
               {label} {/* แสดงชื่อโซน */}
             </Box>
           </Tooltip>
            ))}
          </Box>

          {/* Middle Row (BB Section) */}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}
          >
            {["BB1", "BB2", "BB3", "BB4", "BB5", "BB6"].map((label) => (
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
                 // ส่งข้อมูลไปยังหน้า seat-concert พร้อมกับชื่อโซน (label) และราคา
                 navigate("/concert/seat-concert", {
                   state: { price: ticket?.price, label },
                 });
               }}
               sx={{
                backgroundColor: "#4DC0FF",
                color: "white",
                padding: "15px 25px",
                borderRadius: " 0 0 100% 100%", // ให้กรอบเป็นครึ่งวงกลมที่ด้านบน
                minWidth: "60px",
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease", // การเพิ่ม transition
                "&:hover": {
                  transform: "scale(1.1)", // เพิ่มขนาดเมื่อเมาส์อยู่บนปุ่ม
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // เพิ่มเงาหลัง
                },
              }}
             >
               {label} {/* แสดงชื่อโซน */}
             </Box>
           </Tooltip>
            ))}
          </Box>

          {/* Surrounding Sections (SC, SM, L, R) */}
        </Box>

        {/* STD Zone */}

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
          {["STD"].map((label) => (
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
                // ส่งข้อมูลไปยังหน้า seat-concert พร้อมกับชื่อโซน (label) และราคา
                navigate("/concert/seat-concert", {
                  state: { price: ticket?.price, label },
                });
              }}
              sx={{
                width: "580px",
                maxWidth: "none",
                backgroundColor: "#2D2DFF",
                color: "white",
                textAlign: "center",
                padding: "15px",
                borderRadius: " 0 0 100% 100%", // ให้กรอบเป็นครึ่งวงกลมที่ด้านบน
                mt: 1,
                transition: "transform 0.2s ease, box-shadow 0.2s ease", // การเพิ่ม transition
                "&:hover": {
                  transform: "scale(1.1)", // เพิ่มขนาดเมื่อเมาส์อยู่บนปุ่ม
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // เพิ่มเงาหลัง
                },
              }}
            >
              {label} {/* แสดงชื่อโซน */}
            </Box>
          </Tooltip>
          ))}
        </Box>
        <Box
        
        sx={{
          width: "100%",
          backgroundColor: "",
          color: "white",
          textAlign: "center",
          padding: "15px",
          borderRadius: " 0 0 100% 100%", // ให้กรอบเป็นครึ่งวงกลมที่ด้านบน
          mt: 1,
        }}
      >
      </Box>
    
      </Box>
    </Box>
  );
};

export default StageConcert;
