/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button,  Tooltip, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const StageConcert: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [zones, setZones] = useState<any[]>([]); // เก็บข้อมูลโซน
  const navigate = useNavigate();
  const location = useLocation();
  const concertID = location.state;
  const [conid,setconid]=useState()

  useEffect(() => {
    if (!concertID?.id) return;
    const fetchZones = async () => {
      try {
        console.log('obconcertID.idject',concertID.id)
        setconid(concertID.id)
        const response = await fetch(`http://localhost:5000/getZones?concert_id=${concertID.id}`);
        const data = await response.json();
        console.log('object')
        setZones(data); // บันทึกข้อมูลโซน
        console.log('Zone', data)
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    fetchZones();
  }, [concertID]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };


    const handleBuyTicket = (zone: { id: number, concert_id: number, name: string, seat_count: number }, price: string,label:string) => {
      // ส่งข้อมูลของ zone ที่เลือกไปใน state
      navigate("/concert/seat-concert", {
        state: { zone, price,label, conid },  // ส่งทั้ง zone และราคาที่ปรับแล้ว
      });
    };
    
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        background: "linear-gradient(135deg, #EECDA3 0%, #EF629F 100%);",
        minHeight: "100vh",
        padding: "20px",
        width: "1150px",
        height: "500px",
        borderRadius:"15px",
        maxHeight: "none",
        maxWidth: "none",
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
  {zones.map((zone, index) => {
    // คำนวณราคาของโซน
    // const zonePrice = concertID.price - 1000 * (index + 1);
    // const zonePrice = concertID.price - 1000 * index;
    // const zonePrice = concertID.price + index * 1000.00
    const zonePrice = parseFloat(concertID.price) + index * 1000; // เพิ่มค่าตาม index

    return (
      <Box
        key={index}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f06292",
          color: "white",
          borderRadius: "30px",
          padding: "12px",
          marginBottom: "8px",
        }}
      >
        <Typography>{zone.name}</Typography> {/* แสดงชื่อโซน */}
        <Typography>{zone.seat_count} ที่นั่ง</Typography> {/* แสดงจำนวนที่นั่ง */}
        <Typography>฿{zonePrice}</Typography> {/* แสดงราคาของโซน */}

        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            padding: "8px 16px",
            borderRadius: "30px",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#f8bbd0", color: "white" },
          }}
          onClick={() => handleBuyTicket(zone, zonePrice.toString(),zone.name)}
        >
          จองโซนที่นั่ง
        </Button>
      </Box>
    );
  })}
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
            mb: 3,
          }}
        >
          STAGE
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >

          
          {zones.map((zone, index) => {
            const zonePrice = parseFloat(concertID.price) + index * 1000; // เพิ่มค่าตาม index


            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <Tooltip
                  key={index}
                  title={`ราคาที่นั่ง: ฿${zonePrice}`}
                  arrow
                >
                  <Box
                     onClick={() => handleBuyTicket(zone, zonePrice.toString(),zone.name)}
                    sx={{
                      backgroundColor: "#f06292",
                      color: "white",
                      padding: "25px 50px",
                      borderRadius: "10px",
                      minWidth: "100px",
                      textAlign: "center",
                      marginLeft:"10px",
                      fontSize: "18px",
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    {zone.name} - ฿{zonePrice} {/* แสดงชื่อโซนและราคา */}
                  </Box>
                </Tooltip>
              </Box>
            );
          })}
        </Box>


      </Box>
    </Box>
  );
};

export default StageConcert;
