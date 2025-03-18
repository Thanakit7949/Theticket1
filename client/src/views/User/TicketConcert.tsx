/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import image from "/src/assets/concert/thang.png";
import image1 from "/src/assets/concert/thang1.png";
import Cookies from "js-cookie";
//import html2canvas from "html2canvas";

const TicketConcert: React.FC = () => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const detail = location.state;
  const [datadetail, setDataDetail] = useState<string[]>([]);
  const { price, label, selectedSeats, concert_Zone } = location.state || {}; // ดึงข้อมูลจาก state
  const [loading, setLoading] = useState(false); // State สำหรับการซ่อนปุ่ม

  // const handleDownloadImage = async () => {
  //   if (ticketRef.current) {
  //     setLoading(true); // ตั้งสถานะเป็นกำลังโหลด
  //     try {
  //       const canvas = await html2canvas(ticketRef.current, {
  //         useCORS: true, // ใช้ CORS สำหรับดึงรูปจากโดเมนต่างๆ
  //         allowTaint: true, // อนุญาตให้ดึงข้อมูลจากภาพภายนอกที่มีการขอ CORS
  //       });
  //       const link = document.createElement("a");
  //       link.href = canvas.toDataURL("image/png");
  //       link.download = "ticket.png";
  //       link.click();
  //     } catch (error) {
  //       console.error("เกิดข้อผิดพลาดในการบันทึกภาพ:", error);
  //     } finally {
  //       setLoading(false); // กลับมาจากสถานะโหลดเสร็จ
  //     }
  //   }
  // };
  

  useEffect(() => {
    if (!location.state) {
      console.log("ไม่มีข้อมูล state ที่ถูกส่งมา");
    } else {
      console.log("location.state:", location.state);
      console.log("selectedSeats:", selectedSeats);
      console.log("concert_Zone:", concert_Zone);
      console.log("concert_Zone.conid:", concert_Zone?.conid);
      console.log("detail:", detail);

      const fetchBookingDetails = async () => {
        let userId = Cookies.get("userid");
        let concertId = concert_Zone?.conid; // ใช้ `?.` ป้องกัน undefined error

        if (!userId || !concertId) {
          console.warn("user_id หรือ concert_id ไม่มีค่า", {
            userId,
            concertId,
          });
          return;
        }

        try {
          const response = await fetch(
            `http://localhost:5000/api/booking-details?user_id=${userId}&concert_id=${concertId}`
          );
          if (!response.ok) {
            throw new Error("ไม่สามารถดึงข้อมูลการจองได้");
          }
          const data = await response.json();
          console.log("ข้อมูลการจอง:", data);
          setDataDetail(data);
        } catch (error) {
          console.error("เกิดข้อผิดพลาด:", error);
        }
      };

      fetchBookingDetails();
    }
  }, [location.state, selectedSeats, concert_Zone]);

  // ✅ เช็กก่อนว่า datadetail มีค่าหรือไม่
  if (!datadetail || datadetail.length === 0) {
    console.log("🔴 ไม่มีข้อมูลการจอง หรือ datadetail ยังไม่ถูกโหลด");
  }

  // ✅ เพิ่ม console.log(datadetail) เพื่อตรวจสอบค่าที่ได้จาก API
  console.log("📌 datadetail ก่อน reduce():", datadetail);

  const groupedBookings =
    datadetail?.reduce(
      (acc, item: any) => {
        const key = `${item.concert_name}_${item.concert_location}_${item.concert_date}_${item.concert_time}_${item.concert_img}`;

        if (!acc[key]) {
          acc[key] = {
            concert_img: `http://localhost/concert/all/${item.concert_img}`,
            concert_name: item.concert_name,
            concert_location: item.concert_location,
            concert_date: item.concert_date,
            concert_time: item.concert_time,
            zone_name: item.zone_name,
            total_seats: item.total_seats,
            price: item.price, // ใช้ราคาเดียวกัน
            seat_numbers: [],
          };
        }

        acc[key].seat_numbers.push(item.seat_number);
        return acc;
      },
      {} as Record<string, any>
    ) || {}; // ✅ ป้องกัน error หาก `datadetail` เป็น `undefined`

  // แปลงเป็นอาร์เรย์เพื่อใช้งาน
  const formattedData = Object.values(groupedBookings) || [];

  console.log("📌 ข้อมูลที่ถูกจัดกลุ่ม:", formattedData);

  const numericPrice = price ? parseFloat(price.replace(/[^\d.-]/g, "")) : 0;
  const totalSeatPrice = numericPrice * selectedSeats.length;
  const vatAmount = totalSeatPrice * 0.07;
  const serviceFee = totalSeatPrice * 0.07 * 1.07;
  const totalPrice = totalSeatPrice + vatAmount + serviceFee;

  return (
    <section style={{ textAlign: "center", padding: 20 }}>
   
    <Box
      ref={ticketRef}
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "auto",
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        color="#FF4081"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        คุณทำการสั่งซื้อเรียบร้อยแล้ว!!!
      </Typography>

      <Box sx={{ flex: "1 1 auto", mr: 3 }}>
        {/* <img
          src={formattedData[0]?.concert_img}
          alt={formattedData[0]?.concert_name}
          style={{ width: "40%", maxWidth: "200px", borderRadius: "10px" }}
        /> */}
      </Box>
      <Divider sx={{ backgroundColor: "gray", my: 2 }} />
      <Box sx={{ color: "#151515" }}>
        {/* แสดงข้อมูลจาก state */}
        <Box>
          <Typography variant="h5" color="black" fontWeight="bold">
            {formattedData[0]?.concert_name || "N/A"}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">วันที่ :</Typography>
            <Typography variant="h6">
              {formattedData[0]?.concert_date
                ? new Date(formattedData[0].concert_date).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "N/A"}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">เวลา :</Typography>
            <Typography variant="h6">{formattedData[0]?.concert_time || "N/A"}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">สถานที่ :</Typography>
            <Typography variant="h6">{formattedData[0]?.concert_location || "N/A"}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">จำนวนบัตร:</Typography>
            <Typography variant="h6">{selectedSeats.length} ใบ</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="h6">โซน:</Typography>
            <Typography variant="h6">{label}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              ที่นั่งที่เลือก:
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "right", color: "#ec407a" }}>
              {selectedSeats.length > 0 ? selectedSeats.join(" / ") : "ยังไม่ได้เลือกที่นั่ง"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: "gray", my: 2 }} />

        {/* ราคา */}
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">ราคาบัตร:</Typography>
            <Typography variant="h6">฿{numericPrice}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">ค่าบริการ (VAT 7%):</Typography>
            <Typography variant="h6" color="#1b5e20">
              ฿{vatAmount.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">ค่าธรรมเนียมการชำระเงิน (VAT 7%):</Typography>
            <Typography variant="h6" color="#1b5e20">
              ฿{serviceFee.toFixed(2)}
            </Typography>
          </Box>

          <Divider sx={{ backgroundColor: "gray", my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", color: "red" }}>
            <Typography fontWeight="bold" variant="h6">
              ราคารวมสุทธิ:
            </Typography>
            <Typography fontWeight="bold" variant="h6">
              ฿{totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ backgroundColor: "gray", my: 2 }} />
          {/* เพิ่ม Box สำหรับรูปภาพและข้อความ */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
            <img src={image} alt="Left Image" style={{ width: 100, height: 100 }} />

            {/* ข้อความกลาง */}
            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>
              INTERGETHER
            </Typography>

            <img src={image1} alt="Right Image" style={{ width: 120, height: 120 }} />
          </Box>
        </Box>
      </Box>
      
    </Box>
    <footer
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
       <Button
                 variant="contained"
                 disabled={loading}
                 //onClick={() => navigate("/home-test")}
                 sx={{
                   backgroundColor: "#f48fb1",
                   color: "#ffffff",
                   "&:hover": { backgroundColor: "#c40d19" },
                 }}
               >
                 {"กลับหน้าหลัก"}
               </Button>
       
               <Button
                 variant="contained"
                 color="primary"
                 //onClick={handleDownloadImage}
                 disabled={loading}
                 sx={{
                   backgroundColor: "#c40d19",
                   color: "#ffffff",
                   "&:hover": { backgroundColor: "#f48fb1" },
                 }}
               >
                 {loading ? "กำลังบันทึก..." : "บันทึกเป็นรูปภาพ"}
               </Button>
      </footer>
    </section>
  );
};

export default TicketConcert;
