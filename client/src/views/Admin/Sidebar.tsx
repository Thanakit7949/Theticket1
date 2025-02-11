import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { text: "Concerts", icon: <EventIcon />, link: "/dbconcerts" },
    { text: "Sports", icon: <DashboardIcon />, link: "/dbsports" },
  ];

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "primary.main",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 2,
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h3>My Sidebar</h3>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.link}
            key={item.text}
            sx={{
              "&:hover": { bgcolor: "primary.light" },
              cursor: "pointer",
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
