/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const StageSport: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [zones, setZones] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const sportID = location.state;
  const [sportid, setsportid] = useState();

  const seatStyle = {
    backgroundColor: "#8e24aa",
    color: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "18px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    },
  };
  

  useEffect(() => {
    if (!sportID?.id) return;
    const fetchZones = async () => {
      try {
        setsportid(sportID.id);
        const response = await fetch(
          `http://localhost:5000/getZoneSport?sport_id=${sportID.id}`
        );
        const data = await response.json();
        setZones(data);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };
    fetchZones();
  }, [sportID]);

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

  const handleBuyTicket = (zone: any, price: string, label: string) => {
    navigate("/sport/seat-sport", { state: { zone, price, label, sportid } });
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
      {/* Sidebar */}
      <Box sx={{ width: "505px", mr: 2 }}>
        <Box
          sx={{
            padding: "20px",
            borderRadius: "30px",
            backgroundColor: "#FFF",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            mb: 3,
          }}
        >
          {zones.map((zone, index) => {
            const zonePrice = parseFloat(sportID.price);
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "purple",
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
                <Typography>{zone.name}:</Typography>
                <Typography>{zone.seat_count} ที่นั่ง</Typography>
                <Typography>฿{zonePrice}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#b39ddb", color: "white" },
                  }}
                  onClick={() =>
                    handleBuyTicket(zone, zonePrice.toString(), zone.name)
                  }
                >
                  จองโซนที่นั่ง
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Stage Area */}
      <Box
        sx={{
          width: "740px",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "#FFF",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
          เวลาที่ทำรายการ:{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {formatTime(timeLeft)}
          </span>
        </Typography>

        <Box 
  sx={{ 
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // แบ่ง 3 คอลัมน์ (ซ้าย - กลาง - ขวา)
    gap: 2, 
    justifyContent: "center", 
    alignItems: "center",
    width: "100%", 
    padding: "20px",
    textAlign: "center",
  }}
>
  {/* โซนซ้ายของ STAGE */}
  {zones[0] && (
    <Tooltip title={`ราคาที่นั่ง: ฿${parseFloat(sportID.price)}`} arrow>
      <Box
        onClick={() => handleBuyTicket(zones[0], sportID.price.toString(), zones[0].name)}
        sx={seatStyle}
      >
        {zones[0].name} - ฿{parseFloat(sportID.price)}
      </Box>
    </Tooltip>
  )}

  {/* STAGE ตรงกลาง */}
  <Box
    sx={{
      backgroundColor: "#26a69a",
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      textAlign: "center",
      border: "1px solid white",
      color: "white",
      fontSize: "30px",
      gridColumn: "2", // อยู่ตรงกลาง
    }}
  >
    STAGE
  </Box>

  {/* โซนขวาของ STAGE */}
  {zones[1] && (
    <Tooltip title={`ราคาที่นั่ง: ฿${parseFloat(sportID.price)}`} arrow>
      <Box
        onClick={() => handleBuyTicket(zones[1], (parseFloat(sportID.price) ).toString(), zones[1].name)}
        sx={seatStyle}
      >
        {zones[1].name} - ฿{parseFloat(sportID.price)}
      </Box>
    </Tooltip>
  )}

  {/* 3 โซนด้านล่าง */}
  {zones.slice(2, 5).map((zone, index) => {
    const zonePrice = parseFloat(sportID.price);
    return (
      <Tooltip key={index} title={`ราคาที่นั่ง: ฿${zonePrice}`} arrow>
        <Box
          onClick={() => handleBuyTicket(zone, zonePrice.toString(), zone.name)}
          sx={seatStyle}
        >
          {zone.name} - ฿{zonePrice}
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
