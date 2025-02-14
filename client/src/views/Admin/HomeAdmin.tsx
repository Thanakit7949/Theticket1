import React, { useState, useEffect } from 'react';
import { Box, Typography, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, People, Dashboard, ShoppingCart, Event, SportsSoccer } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TopBarD from '../../compones/TopBarD';
import Sidebar from '../../compones/Sidebar';


const HomeAdmin: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string>('interface');
  const navigate = useNavigate();

  useEffect(() => {
    // Add real-time update logic here
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBarD 
      onNavigate={handleNavigation} />
      
    </Box>
  );
};

export default HomeAdmin;
