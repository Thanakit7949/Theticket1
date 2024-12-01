import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Dbconcerts from "./Dbconcerts";
import Dbsports from "./Dbsports";
import Profile from "../User/Profile";

const Dashboards: React.FC = () => {
  // State สำหรับจัดการการแสดงเนื้อหา
  const [activeContent, setActiveContent] = useState<string>("profile");

  return (
    <Box display="flex" position="fixed" top={0} left={0} width="100vw" height="100vh">
      {/* Sidebar */}
      <Box width="250px" bgcolor="primary.main" color="white" height="100%" p={2}>
        <Typography variant="h6" mb={2}>
          Admin Dashboard
        </Typography>
        {/* Sidebar Buttons */}
        <Button
          fullWidth
          variant="text"
          color="inherit"
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            "&:hover": { bgcolor: "primary.light" },
          }}
          onClick={() => setActiveContent("profile")}
        >
          Profile
        </Button>
        <Button
          fullWidth
          variant="text"
          color="inherit"
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            "&:hover": { bgcolor: "primary.light" },
          }}
          onClick={() => setActiveContent("concerts")}
        >
          Concerts
        </Button>
        <Button
          fullWidth
          variant="text"
          color="inherit"
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            "&:hover": { bgcolor: "primary.light" },
          }}
          onClick={() => setActiveContent("sports")}
        >
          Sports
        </Button>
      </Box>

      {/* Main Content */}
      <Box
        flexGrow={1}
        p={3}
        bgcolor="#fff5e6"
        overflow="auto" // เพิ่มส่วนนี้
      >
        {activeContent === "profile" && <Profile />}
        {activeContent === "concerts" && <Dbconcerts />}
        {activeContent === "sports" && <Dbsports />}
      </Box>
    </Box>
  );
};

export default Dashboards;
