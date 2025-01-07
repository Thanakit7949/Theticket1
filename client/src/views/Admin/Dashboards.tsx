import React, { useState, useEffect } from "react";
import { Box, Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, CssBaseline } from "@mui/material";
import { Home, People, Dashboard, ShoppingCart, Event, SportsSoccer, Settings, ExitToApp } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import Dbconcerts from "./Dbconcerts";
import Dbsports from "./Dbsports";
import Profile from "../User/Profile";
import Users from "./Users";
import Interface from "./Interface";
import Orders from "./Orders";

const drawerWidth = 240;

const Dashboards: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string>("interface");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Add real-time update logic here
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (option: string) => {
    handleMenuClose();
    if (option === "Profile") {
      setActiveContent("profile");
    } else if (option === "Theticket") {
      navigate("/home-test");
    } else if (option === "Settings") {
      // Handle settings navigation
    } else if (option === "Logout") {
      // Handle logout
      navigate("/login"); // Navigate to login or home page
    }
  };

  const menuItems = [
    { text: 'Interface', icon: <Dashboard />, content: 'interface' },
    { text: 'Profile', icon: <Home />, content: 'profile' },
    { text: 'Users', icon: <People />, content: 'users' },
    { text: 'Orders', icon: <ShoppingCart />, content: 'orders' },
    { text: 'Concerts', icon: <Event />, content: 'concerts' },
    { text: 'Sports', icon: <SportsSoccer />, content: 'sports' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar alt="Profile Picture" src="/path/to/profile.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuClick("Profile")}>Profile</MenuItem>
            <MenuItem onClick={() => handleMenuClick("Theticket")}>Theticket</MenuItem>
            <MenuItem onClick={() => handleMenuClick("Settings")}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={() => handleMenuClick("Logout")}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'secondary.main', color: 'white' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => setActiveContent(item.content)}>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5", overflow: "auto", mt: 8 }}
      >
        {activeContent === "interface" && <Interface />}
        {activeContent === "profile" && <Profile />}
        {activeContent === "users" && <Users />}
        {activeContent === "orders" && <Orders />}
        {activeContent === "concerts" && <Dbconcerts />}
        {activeContent === "sports" && <Dbsports />}
      </Box>
    </Box>
  );
};

export default Dashboards;
