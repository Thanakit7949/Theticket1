import React, { useState, useEffect } from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, CssBaseline, Button, Container, Paper } from '@mui/material';
import { Home, People, Dashboard, ShoppingCart, Event, SportsSoccer, Settings, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Dbconcerts from './Dbconcerts';
import Dbsports from './Dbsports';
import Users from './Users';
import Interface from './Interface';
import Orders from './Orders';
import Profiles from './Profiles';

const drawerWidth = 240;

const HomeAdmin: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string>('interface');
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
    if (option === 'Profile') {
      setActiveContent('profiles');
    } else if (option === 'Theticket') {
      navigate('/home-test');
    } else if (option === 'Settings') {
      // Handle settings navigation
    } else if (option === 'Logout') {
      // Handle logout
      navigate('/login'); // Navigate to login or home page
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
      <AppBar position="fixed" sx={{ background: 'linear-gradient(to right, #D8BFD8, #FFEBCD)' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 2, textShadow: '1px 1px 3px rgba(255, 105, 180, 0.6)', color: 'black' }}>
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
              <MenuItem onClick={() => handleMenuClick('Profile')}>Profile</MenuItem>
              <MenuItem onClick={() => handleMenuClick('Theticket')}>Theticket</MenuItem>
              <MenuItem onClick={() => handleMenuClick('Settings')}>Settings</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleMenuClick('Logout')}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: 'linear-gradient(to right, #D8BFD8, #FFEBCD)', color: 'black', mt: 8 },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => setActiveContent(item.content)}>
                <ListItemIcon sx={{ color: 'black' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', overflow: 'auto', mt: 8 }}
      >
        <Box
          p={3}
          sx={{
            background: "linear-gradient(to right, #FDF6B6, #A0D3E8)", // Background gradient
            color: "black",
            borderRadius: "25px",
            boxShadow: 3,
            border: 2,
            borderColor: "gray.700",
            width: "100%", // Adjusted to fit screen
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
              backgroundColor: "#e0f2f1", // Background color for text
              padding: "20px 30px", // Padding
              borderRadius: 2, // Rounded corners
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Shadow
              letterSpacing: 2, // Letter spacing
              textShadow: "1px 1px 3px rgba(255, 105, 180, 0.6)", // Text shadow
              color: "#2A505A", // Text color
              fontSize: "3rem", // Font size
              border: "5px solid #8BD2EC",
            }}
          >
            Admin Dashboard
          </Typography>

          <Box display="flex" flexDirection="column" gap={2} p={2}>
            {activeContent === 'interface' && <Interface />}
            {activeContent === 'profile' && <Profiles />}
            {activeContent === 'users' && <Users />}
            {activeContent === 'orders' && <Orders />}
            {activeContent === 'concerts' && <Dbconcerts />}
            {activeContent === 'sports' && <Dbsports />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeAdmin;
