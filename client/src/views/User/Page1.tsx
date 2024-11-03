import React from "react";
import AppBarT from "../../compones/Appbar";
import Grid from "@mui/material/Grid2";
import { Box, Button, Typography } from "@mui/material";
export interface IPage1PageProps {}
const Page1Page: React.FunctionComponent<IPage1PageProps> = (props) => {
  return (
    <>
      <Grid container>
        <Grid size={{ md: 12, xs: 12 }}>
          <Typography>{"page1in"}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          size={{ md: 8, xs: 12 }}
          sx={{ bgcolor: "#FFC0CB", border: "1px solid red" }}
        ></Grid>
        <Grid
          size={{ md: 4, xs: 12 }}
          sx={{ bgcolor: "#FFC0CB", border: "1px solid green" }}
        ></Grid>
      </Grid>

      <Box
        p={3}
        sx={{
          background: "linear-gradient(to right, #FDF6B6, #A0D3E8)", // กำหนดสีพื้นหลังที่ต้องการ
          color: "black",
          borderRadius: "25px",
          boxShadow: 3,
          border: 2,
          borderColor: "gray.700",
          width: "102%",
          maxWidth: "1200px",
          mx: "auto",
          mt: 2,
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{
            position: "relative",
            backgroundColor: "#e0f2f1", // พื้นหลังให้ข้อความ
            padding: "20px 30px", // เพิ่ม padding
            borderRadius: 2, // มุมโค้ง
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // เงาให้ข้อความ
            letterSpacing: 2, // เพิ่มระยะห่างระหว่างตัวอักษร
            textShadow: "1px 1px 3px rgba(255, 105, 180, 0.6)", // เงาข้อความ
            color: "#2A505A", // สีข้อความที่สดใส
            fontSize: "3rem", // ขนาดตัวอักษรใหญ่ขึ้น
            border: "5px solid #8BD2EC",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: -40,
              fontSize: "4rem",
              color: "pink",
            }}
          >
            🎤
          </Box>
          Upcoming Concerts
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: -40,
              fontSize: "4rem",
              color: "pink",
            }}
          >
            🎶
          </Box>
        </Typography>

        {/* View All Concerts Button */}
        <Box textAlign="center" mt={3}></Box>
      </Box>
    </>
  );
};
export default Page1Page;
