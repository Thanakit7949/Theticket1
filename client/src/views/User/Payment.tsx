import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Payment: React.FC = () => {
  const location = useLocation();
  const { price, label, selectedSeats } = location.state || {}; // ค่าที่ส่งมาจากหน้า Concert

  // แปลงราคาเป็นตัวเลข (เอาเฉพาะตัวเลขออกจากข้อความ)
  const numericPrice = price ? parseFloat(price.replace(/[^\d.-]/g, "")) : 0;

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
        maxWidth: "none",
      }}
    >
      {/* Sidebar ซ้าย */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "740px",
          mr: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "left" }}
        >
          ● ข้อมูลผู้ซื้อบัตร
        </Typography>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="ชื่อ"
              defaultValue="สวย"
              InputProps={{
                style: { borderRadius: "20px", color: "black" }, // ขอบมนและสีข้อความสีขาว
              }}
              InputLabelProps={{
                style: { color: "#a0a0a0" }, // สีของป้ายข้อความ
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "20px",
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="นามสกุล"
              defaultValue="งาน"
              InputProps={{
                style: { borderRadius: "20px", color: "black" },
              }}
              InputLabelProps={{
                style: { color: "#a0a0a0" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "20px",
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="เบอร์โทรศัพท์"
              defaultValue="0926239547"
              InputProps={{
                style: { borderRadius: "20px", color: "black" },
              }}
              InputLabelProps={{
                style: { color: "#a0a0a0" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "20px",
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ flex: "1 1 45%" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="อีเมล"
              defaultValue="onanongmaenthim@gmail.com"
              InputProps={{
                style: { borderRadius: "20px", color: "black" },
              }}
              InputLabelProps={{
                style: { color: "#a0a0a0" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "20px",
                  },
                },
              }}
            />
          </Box>
        </Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "left", mt: 2 }}
        >
          ● บริการคุ้มครองตั๋วการแสดง
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={
              <Typography>
                ต้องการรับ{" "}
                <Link
                  to="/concert"
                  style={{ textDecoration: "underline", color: "blue" }}
                >
                  บริการคุ้มครองตั๋วการแสดง
                </Link>
              </Typography>
            }
          />
        </FormGroup>
        <Typography sx={{ mt: -1, ml: 3.8 }}>
          (ชำระค่าเบี้ยคุ้มครองฯ 7% ของราคาบัตร)
        </Typography>
      </Box>

      {/* ข้อมูลการชำระเงิน Sidebar ขวา*/}
      <Box
        sx={{
          width: "505px",
          maxWidth: "none",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "#FFF",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "left" }}
        >
          สรุปรายการสั่งซื้อ
        </Typography>

        {/* แสดงราคารวม */}
        <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>ราคารวม:</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${numericPrice * selectedSeats.length}` // คูณจำนวนที่นั่งกับราคา
                : "กรุณาเลือกที่นั่ง"}
            </span>
          </Box>
        </Typography>

        <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
          โซนที่นั่ง: {label}
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, textAlign: "left" }}>
          ที่นั่งที่เลือก:{" "}
          {selectedSeats.length > 0
            ? selectedSeats
                .map(
                  (seat: { row: number; col: number }) =>
                    `${label}${seat.row}-${seat.col}`
                )
                .join(" / ") // Joining the seats with a separator (e.g., " / ")
            : "ยังไม่ได้เลือกที่นั่ง"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Payment;
