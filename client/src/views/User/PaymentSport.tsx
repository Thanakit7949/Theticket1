/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Image from "/src/assets/concert/mastercard.png";
import Image1 from "/src/assets/concert/visa.jpg";
import Image2 from "/src/assets/concert/jcb.png";
import Image3 from "/src/assets/concert/express.png";
import Image4 from "/src/assets/concert/prompt.png";
import Image5 from "/src/assets/concert/qrcode.jpg";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";

const PaymentSport: React.FC = () => {
  const [slip, setSlip] = useState<File | null>(null);
  const location = useLocation();
  const { price, label, selectedSeats, sport_Zone } = location.state || {}; // ค่าที่ส่งมาจากหน้า Concert

  useEffect(() => {
    if (!location.state) {
      console.log("ไม่มีข้อมูล state ที่ถูกส่งมา");
    } else {
      console.log("location.state:", location.state);
      console.log("selectedSeats:", selectedSeats);
    }
  }, [location.state, selectedSeats]);
  // แปลงราคาเป็นตัวเลข (เอาเฉพาะตัวเลขออกจากข้อความ)
  const numericPrice = price ? parseFloat(price.replace(/[^\d.-]/g, "")) : 0;

  // ใช้ state ในการควบคุมกลุ่มที่เปิด
  const [openSection, setOpenSection] = useState(null);

  // ฟังก์ชันที่ใช้ในการเปิด/ปิดกลุ่ม
  const toggleSection = (section: any) => {
    // ถ้ากลุ่มที่คลิกเป็นกลุ่มเดิมก็จะปิด, ถ้าไม่ใช่จะเปิดกลุ่มนั้น
    setOpenSection(openSection === section ? null : section);
  };

  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setChecked(event.target.checked);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [openCardDialog, setOpenCardDialog] = useState(false);
  const handleOpenCardDialog = () => setOpenCardDialog(true);
  const handleCloseCardDialog = () => setOpenCardDialog(false);

  const [openPromptPayDialog, setOpenPromptPayDialog] = useState(false);

  const handleOpenPromptPayDialog = () => setOpenPromptPayDialog(true);
  const handleClosePromptPayDialog = () => setOpenPromptPayDialog(false);

  const totalSeatPrice = numericPrice * selectedSeats.length;
  const vatAmount = totalSeatPrice * 0.07;
  const serviceFee = vatAmount * 1.07;
  const totalPrice = totalSeatPrice + vatAmount + serviceFee;

  const [creditCardNumber, setCreditCardNumber] = React.useState("");
  const [cardName, setCardName] = React.useState("");
  const [expirationMonth, setExpirationMonth] = React.useState("");
  const [expirationYear, setExpirationYear] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);

  const validateForm = () => {
    if (
      creditCardNumber.trim() &&
      cardName.trim() &&
      expirationMonth &&
      expirationYear &&
      cvv.trim()
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSlip(e.target.files[0]);
    }
  };

  // เรียก validateForm ทุกครั้งที่ข้อมูลเปลี่ยนแปลง
  React.useEffect(() => {
    validateForm();
  }, [creditCardNumber, cardName, expirationMonth, expirationYear, cvv]);

  const navigate = useNavigate();

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
      width={970}
      maxHeight="none"
      height={1750}
      sx={{
        background: "linear-gradient(135deg, #EECDA3 0%, #EF629F 100%);",
      }}
    >
      {/* Sidebar ซ้าย */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "940px",
          mr: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "left", color: "black" }}
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
              value={Cookies.get("acountname")}
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
              value={Cookies.get("lastname")}
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
              value={Cookies.get("phone")}
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
              value={Cookies.get("email")}
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
      </Box>

      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 2,
          textAlign: "left",
          marginTop: "15px",
          color: "black",
        }}
      >
        ● สรุปรายการสั่งซื้อ
      </Typography>
      <Box
        sx={{
          width: "940px",
          maxWidth: "none",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          borderBottom: "1px solid #000", // เส้นขีดใต้ข้อความ
          paddingBottom: "5px", // เพิ่มระยะห่างระหว่างข้อความกับเส้นขีด
          flexWrap: "wrap",
          marginTop: "2px",
        }}
      >
        {/* แสดงราคารวม */}
        <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "15px",
              color: "black",
            }}
          >
            <span>{label}:</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${numericPrice * selectedSeats.length}` // คูณจำนวนที่นั่งกับราคา
                : "กรุณาเลือกที่นั่ง"}
            </span>
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 1, textAlign: "left", color: "black" }}
        >
          โซนที่นั่ง: {label}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            textAlign: "left",
            borderBottom: "1px solid #000", // เส้นขีดใต้ข้อความ
            paddingBottom: "5px", // เพิ่มระยะห่างระหว่างข้อความกับเส้นขีด
            color: "black",
          }}
        >
          ที่นั่งที่เลือก: 
            {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "ยังไม่ได้เลือกที่นั่ง"}
        </Typography>

        {/* ราคารวม */}
        <Typography
          variant="h6"
          sx={{ mb: 1, textAlign: "left", color: "black" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>ราคาบัตรกีฬา</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${(numericPrice * selectedSeats.length).toFixed(2)}` // คูณจำนวนที่นั่งกับราคา
                : "กรุณาเลือกที่นั่ง"}
            </span>
          </Box>
        </Typography>

        {/* ค่าบริการ (VAT incl.) */}
        <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              color: "black",
            }}
          >
            <span>ค่าบริการ (VAT incl.)</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${(numericPrice * selectedSeats.length * 0.07).toFixed(2)}` // คำนวณ VAT 7% จากราคารวม
                : "ค่าบริการ"}
            </span>
          </Box>
        </Typography>
        {/* ค่าธรรมเนียมการชำระเงิน (VAT incl.) */}
        <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderBottom: "1px solid #000", // เส้นขีดใต้ข้อความ
              paddingBottom: "5px", // เพิ่มระยะห่างระหว่างข้อความกับเส้นขีด
              color: "black",
            }}
          >
            <span>ค่าธรรมเนียมการชำระเงิน (VAT incl.)</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${(numericPrice * selectedSeats.length * 0.07 * 1.07) // คำนวณค่าธรรมเนียม 7% บวก VAT 7%
                    .toFixed(2)}`
                : "ค่าธรรมเนียมการชำระเงิน"}
            </span>
          </Box>
        </Typography>
        {/* ราคารวมสุทธิ */}
        <Typography variant="h6" sx={{ mb: 2, textAlign: "left" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              color: "black",
            }}
          >
            <span>ราคารวมสุทธิ</span>
            <span>
              {selectedSeats.length > 0
                ? `฿${(
                    numericPrice * selectedSeats.length + // ราคารวม
                    numericPrice * selectedSeats.length * 0.07 + // ค่าบริการ (VAT)
                    numericPrice * selectedSeats.length * 0.07 * 1.07
                  ) // ค่าธรรมเนียมการชำระเงิน (VAT)
                    .toFixed(2)}`
                : "ราคารวมสุทธิ"}
            </span>
          </Box>
        </Typography>
      </Box>

      <Box
        sx={{
          width: "940px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          color: "black",
          marginTop: "5px",
        }}
      >
        <Box sx={{ flex: "1 1 45%" }}>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            มีรหัสโปรโมชันหรือไม่?
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* โค้ดส่วนลด */}
            <TextField
              label="โค้ดส่วนลด"
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{
                flex: 1, // ทำให้ฟิลด์ยาวเต็มพื้นที่
                borderRadius: 2,
                "& .MuiOutlinedInput-root": { borderRadius: 20, height: 50 },
              }}
            />
            {/* ปุ่ม */}
            <Button
              variant="contained"
              sx={{
                height: 50,
                borderRadius: 20,
                padding: "0 16px",
                fontWeight: "bold",
                backgroundColor: "gray", // เปลี่ยนสีปุ่ม
                "&:hover": {
                  backgroundColor: "#004d40", // สีปุ่มเมื่อ hover
                },
              }}
            >
              ยืนยัน
            </Button>
          </Box>
        </Box>
      </Box>
      {/* ยอมรับข้อตกลง */}
      <Box
        sx={{
          width: "940px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginTop: "5px",
          color: "black",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          หากท่านได้ชำระค่าสินค้า หรือค่าบริการเรียบร้อยแล้ว
          โดยเราได้ทำการสำรองที่นั่ง หรือสินค้าให้แก่ท่านแล้ว
          ในกรณีที่ท่านมิได้เข้าชมการแสดง หรือมิได้มารับบัตรภายในเวลาที่กำหนด
          เราขอสงวนสิทธิ์ในการคืนเงินให้แก่ท่าน ไม่ว่ากรณีใดก็ตาม
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              color="success"
              sx={{
                transform: "scale(1.5)", // เพิ่มขนาดของ Checkbox
                marginTop: "8px",
              }}
            />
          }
          label={
            <Box>
              {/* ข้อความพร้อมคำที่สามารถกดได้ */}
              <Typography sx={{ fontSize: "1.25rem", marginTop: "6px" }}>
                ฉันยอมรับ ข้อตกลงเงื่อนไขตามรายละเอียดด้านบน{" "}
                <span
                  style={{
                    color: "red",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={handleOpenDialog}
                >
                  และข้อกำหนดการให้บริการ
                </span>
              </Typography>

              {/* Dialog/Modal Popup */}
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>ข้อกำหนดการให้บริการ</DialogTitle>
                <DialogContent>
                  <Typography>
                    นี่คือข้อกำหนดการให้บริการของเรา
                    ซึ่งจะมีข้อมูลเกี่ยวกับการใช้งาน และข้อปฏิบัติต่าง ๆ
                    ที่ผู้ใช้ต้องทราบและยอมรับก่อนการใช้งาน
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    ปิด
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          }
        />
      </Box>
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "left",
            mt: 2,
            color: "black",
          }}
        >
          ● การชำระเงิน
        </Typography>

        {/* ข้อมูลการชำระเงินด้วยบัตรเครดิต */}
        <Box sx={{ borderRadius: 2, overflow: "hidden", width: "940px" }}>
          {/* ส่วนบนที่เป็นสีแดง */}
          <Box sx={{ backgroundColor: "red", color: "white", p: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              <IconButton
                onClick={() => toggleSection("card")}
                color="inherit"
                size="large"
              >
                {openSection === "card" ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
              เดบิต/เครดิตการ์ด
            </Typography>
          </Box>

          <Collapse in={openSection === "card"}>
            <Box sx={{ backgroundColor: "white", color: "black", p: 3 }}>
              {/* แสดงรูปภาพ */}
              <Box sx={{ display: "flex", gap: "7px" }}>
                <img
                  src={Image}
                  alt="Image 1"
                  style={{ width: "8%", height: "35px", borderRadius: "8px" }}
                />
                <img
                  src={Image1}
                  alt="Image 2"
                  style={{ width: "8%", height: "35px", borderRadius: "8px" }}
                />
                <img
                  src={Image2}
                  alt="Image 3"
                  style={{ width: "9%", height: "35px", borderRadius: "8px" }}
                />
                <img
                  src={Image3}
                  alt="Image 4"
                  style={{ width: "8%", height: "31px", borderRadius: "8px" }}
                />
              </Box>
              {/* ช่องกรอกหมายเลขบัตรเครดิต */}
              <TextField
                label="หมายเลขบัตรเครดิต"
                fullWidth
                variant="outlined"
                margin="normal"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: 20, height: 56 },
                }}
                value={creditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
              />
              {/* ช่องกรอกชื่อบัตรเครดิต */}
              <TextField
                label="ชื่อบัตรเครดิต"
                fullWidth
                variant="outlined"
                margin="normal"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: 20, height: 56 },
                }}
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              {/* วันหมดอายุและ CVV */}
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Select
                  fullWidth
                  variant="outlined"
                  value={expirationMonth}
                  displayEmpty
                  onChange={(e) => setExpirationMonth(e.target.value)}
                  sx={{
                    borderRadius: 20,
                    height: 56,
                    mt: 2,
                    "& .MuiOutlinedInput-root": { borderRadius: 20 },
                  }}
                >
                  <MenuItem value="" disabled>
                    เดือน
                  </MenuItem>
                  {[...Array(12).keys()].map((month) => (
                    <MenuItem key={month + 1} value={month + 1}>
                      {month + 1}
                    </MenuItem>
                  ))}
                </Select>

                <Select
                  fullWidth
                  variant="outlined"
                  value={expirationYear}
                  displayEmpty
                  onChange={(e) => setExpirationYear(e.target.value)}
                  sx={{
                    borderRadius: 20,
                    mt: 2,
                    height: 56,
                    "& .MuiOutlinedInput-root": { borderRadius: 20 },
                  }}
                >
                  <MenuItem value="" disabled>
                    ปี
                  </MenuItem>
                  {[...Array(10).keys()].map((year) => (
                    <MenuItem key={year + 2024} value={year + 2024}>
                      {year + 2024}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  label="CVV"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  sx={{
                    borderRadius: 20,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 20,
                      height: 56,
                    },
                  }}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </Box>
              {/* ข้อมูลการชำระเงิน */}
              <Typography
                variant="h6"
                sx={{ mt: 2, color: "black", textAlign: "left", mb: 2 }}
              >
                ข้อมูลการชำระจะปรากฎชื่อ OPN "INTERGATER"
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "black", textAlign: "left" }}
              >
                เรารองรับการชำระเงินผ่านบัตรเดบิตของ KTB, Bangkok Bank, SCB,
                KBANK, Bank of Ayudhya, Thanachart Bank รองรับบัตรเครดิต Visa,
                Mastercard และ American Express
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpenCardDialog}
                sx={{
                  marginTop: 2,
                  borderRadius: 20,
                  backgroundColor: formValid ? "red" : "gray",
                  width: 450,
                  height: 50,
                  color: "white",
                  cursor: formValid ? "pointer" : "not-allowed",
                  fontSize: "20px",
                  "&:hover": {
                    backgroundColor: formValid ? "#c40d19" : "gray",
                  },
                }}
                disabled={!formValid}
              >
                ยืนยันการสั่งซื้อ
              </Button>
              {/* ชำระเงินเดบิต Confirmation Dialog */}
              <Dialog
                open={openCardDialog}
                onClose={handleCloseCardDialog}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "red",
                  }}
                >
                  <Typography variant="h5" sx={{ color: "white" }}>
                    คุณแน่ใจหรือไม่ว่าจะยืนยันการสั่งซื้อ!!!
                  </Typography>
                </DialogTitle>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 20,
                      backgroundColor: "green",
                      width: "48%",
                      height: 50,
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "#c40d19",
                      },
                    }}
                    onClick={() =>
                      navigate("/sport/ticket-sport", {
                        state: { price, label, selectedSeats, sport_Zone },
                      })
                    }
                  >
                    ยืนยัน
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 20,
                      border: "1px solid red",
                      color: "red",
                      width: "48%",
                      height: 50,
                      fontSize: "18px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                        border: "1px solid red",
                      },
                    }}
                    onClick={handleCloseCardDialog}
                  >
                    ยกเลิก
                  </Button>
                </div>
              </Dialog>
            </Box>
          </Collapse>
        </Box>

        {/* ข้อมูลการชำระเงินด้วยพร้อมเพย์ */}
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            marginTop: "15px",
            width: "940px",
          }}
        >
          {/* ส่วนบนที่เป็นสีแดง */}
          <Box sx={{ backgroundColor: "red", color: "white", p: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              <IconButton
                onClick={() => toggleSection("promptPay")}
                color="inherit"
                size="large"
              >
                {openSection === "promptPay" ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </IconButton>
              พร้อมเพย์
            </Typography>
          </Box>

          <Collapse in={openSection === "promptPay"}>
            <Box sx={{ backgroundColor: "white", color: "black", p: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "black", textAlign: "left" }}
              >
                ชำระผ่านช่องทางพร้อมเพย์
              </Typography>

              {/* แสดงรูปภาพ */}
              <Box sx={{ display: "flex", gap: "7px" }}>
                <img
                  src={Image4}
                  alt="Image 1"
                  style={{ width: "50%", height: "auto", borderRadius: "8px" }}
                />
              </Box>

              {/* ข้อมูลการชำระเงิน */}
              <Typography
                variant="h6"
                sx={{ mt: 2, color: "black", textAlign: "left" }}
              >
                ขั้นตอนการชำระเงิน
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "black", textAlign: "left" }}
              >
                หลังจากคลิกยืนยันการชำระเงิน ระบบจะสร้าง QR Code สำหรับชำระเงิน
                ท่านสามารถสแกน QR Code เพื่อชำระเงินได้ทันที
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpenPromptPayDialog}
                sx={{
                  marginTop: 2,
                  borderRadius: 20,
                  backgroundColor: "red",
                  width: 450,
                  height: 50,
                  color: "white",
                  fontSize: "20px",
                  "&:hover": {
                    backgroundColor: "#c40d19",
                    border: "1px solid white",
                  },
                }}
              >
                แสดง QR Code
              </Button>

              {/* Payment Confirmation Dialog */}
              <Dialog
                open={openPromptPayDialog}
                onClose={handleClosePromptPayDialog}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "red",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "white" }}>
                    รอการชำระเงินจากคุณ
                  </Typography>
                  <IconButton onClick={handleClosePromptPayDialog}>
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>

                <DialogContent sx={{ backgroundColor: "white" }}>
                  <Box sx={{ padding: 2, color: "#151515" }}>
                    <Typography
                      variant="h4"
                      align="center"
                      sx={{ fontWeight: "bold" }}
                    >
                      PromptPay QR Code
                    </Typography>

                    <img
                      src={Image5}
                      alt="Event Thumbnail"
                      style={{
                        width: "400px",
                        borderRadius: "16px",
                        marginTop: "20px",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ fontWeight: "bold" }}
                    >
                      SCAN QR CODE
                    </Typography>
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{ color: "red", fontWeight: "bold" }}
                    >
                      ฿{totalPrice.toFixed(2)}
                    </Typography>
                    <Divider sx={{ backgroundColor: "gray" }} />

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h5" sx={{ mb: 1, color: "black" }}>
                        อัปโหลดสลิปการโอนเงิน:
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{
                          marginBottom: "10px",
                          fontSize: "17px",
                          color: "red",
                        }}
                      />
                      {slip && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body1">สลิปที่แนบมา:</Typography>
                          <img
                            src={URL.createObjectURL(slip)}
                            alt="สลิปการโอนเงิน"
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              border: "1px solid #ccc",
                              borderRadius: 8,
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                    {/* กดเพื่อแสดงหน้าใบเสร็จ */}
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: 2,
                        borderRadius: 20,
                        backgroundColor: "red",
                        width: "100%",
                        height: 50,
                        fontSize: "20px",
                        "&:hover": {
                          backgroundColor: "#c40d19",
                          border: "1px solid white",
                        },
                      }}
                      onClick={() => {
                        if (!slip) {
                          // ถ้ายังไม่ได้แนบสลิปจะแจ้งเตือน
                          alert("กรุณาแนบรูปสลิปการโอนเงินก่อน!");
                          return;
                        }
                        // ถ้ามีการแนบสลิปแล้ว ค่อยไปยังหน้าใบเสร็จ
                        navigate("/sport/ticket-sport", {
                          state: { price, label, selectedSeats, sport_Zone },
                        });
                      }}
                    >
                      กดเพื่อแสดงหน้าใบเสร็จ
                    </Button>
                  </Box>
                </DialogContent>
              </Dialog>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentSport;
