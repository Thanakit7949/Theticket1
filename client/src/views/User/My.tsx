import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Payment: React.FC = () => {
  const location = useLocation();
  const { price, label, selectedSeats } = location.state || {}; // ค่าที่ส่งมาจากหน้า Concert

  // แปลงราคาเป็นตัวเลข (เอาเฉพาะตัวเลขออกจากข้อความ)
  const numericPrice = price ? parseFloat(price.replace(/[^\d.-]/g, "")) : 0;

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setChecked(event.target.checked);
  };

  const [openDialog, setOpenDialog] = useState(false);

  // เปิด popup เมื่อคลิกที่ "ข้อกำหนดการให้บริการ"
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // ปิด popup
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const totalSeatPrice = numericPrice * selectedSeats.length;
  const vatAmount = totalSeatPrice * 0.07;
  const serviceFee = vatAmount * 1.07;
  const totalPrice = totalSeatPrice + vatAmount + serviceFee;

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
          sx={{ fontWeight: "bold", mb: 2, textAlign: "left" ,color:"black"}}
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

      
      </Box>
      

      <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "left" ,marginTop:"15px",color:"black"}}
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
            marginTop:"2px"
          }}
          
        >
          {/* แสดงราคารวม */}
          <Typography variant="h6" sx={{ mb: 1, textAlign: "left" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop:"15px",
                color:"black"
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

          <Typography variant="h6" sx={{ mb: 1, textAlign: "left" ,color:"black"}}>
            โซนที่นั่ง: {label}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 2,
              textAlign: "left",
              borderBottom: "1px solid #000", // เส้นขีดใต้ข้อความ
              paddingBottom: "5px", // เพิ่มระยะห่างระหว่างข้อความกับเส้นขีด
              color:"black"
            }}
          >
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

          {/* ราคารวม */}
          <Typography variant="h6" sx={{ mb: 1, textAlign: "left",color:"black" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>ราคารวม</span>
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
                color:"black"
              }}
            >
              <span>ค่าบริการ (VAT incl.)</span>
              <span>
                {selectedSeats.length > 0
                  ? `฿${(numericPrice * selectedSeats.length * 0.07).toFixed(
                      2
                    )}` // คำนวณ VAT 7% จากราคารวม
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
                color:"black"
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
                color:"black"
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
            color:"black",
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
            color:"black"
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
                  marginTop: "10px",
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
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              marginTop: 2,
              borderRadius: 20,
              backgroundColor: "red",
              width: 550,
              height: 50,
              color: "white",
              "&:hover": {
                backgroundColor: "#c40d19",
                border: "1px solid white",
              },
            }}
          >
            ยืนยันชำระเงิน
          </Button>

          {/* Payment Confirmation Dialog */}
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ backgroundColor: "white" }}>
              <Box sx={{ padding: 2, color: "#151515" }}>
                <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                  <img
                    src="image_url_here"
                    alt="Event Thumbnail"
                    style={{ width: 100, borderRadius: 8 }}
                  />
                  <Box>
                    <Typography variant="h6">
                      Y and Pride Perspectives Talk : Charlotte Austin
                    </Typography>
                    <Typography variant="h6" color="gray">
                      📅 6 ธันวาคม 2024
                    </Typography>
                    <Typography variant="h6" color="gray">
                      🕒 17:00 – 22:00 น.
                    </Typography>
                    <Typography variant="h6" color="gray">
                      📍 Glowfish Siam Patumwan
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ backgroundColor: "gray" }} />

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">
                    หมายเลขคำสั่งซื้อ : 2024111413633000264
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h6">จำนวนบัตร:</Typography>
                      <Typography variant="h6">
                        {selectedSeats.length} ใบ
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Typography variant="h6">โซน:</Typography>
                      <Typography variant="h6">{label}</Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h6">ราคาบัตร:</Typography>
                      <Typography variant="h6">฿{numericPrice}</Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ backgroundColor: "gray", my: 2 }} />
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6">ราคารวม:</Typography>
                    <Typography variant="h6">
                      ฿{totalSeatPrice.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6">ค่าบริการ (VAT 7%):</Typography>
                    <Typography variant="h6">
                      ฿{vatAmount.toFixed(2)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6">
                      ค่าธรรมเนียมบัตรเดบิต/เครดิต (VAT 7%):
                    </Typography>
                    <Typography variant="h6">
                      ฿{serviceFee.toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider sx={{ backgroundColor: "gray", my: 2 }} />

                  <Typography
                    variant="h5"
                    align="center"
                    sx={{ color: "#e91e63" }}
                  >
                    ราคาสุทธิ ฿{totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                    onClick={handleClickOpen}
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
                >
                  ชำระเงินด้วยเดบิต/เครดิตการ์ด
                </Button>
                
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
                >
                  ชำระเงินด้วยคิวอาร์โค้ด
                </Button>
               
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      
    </Box>
  );
};

export default Payment;
