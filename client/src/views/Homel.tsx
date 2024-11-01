import React, { useEffect, useState } from 'react'
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "../components/sidebarleft/SideBar";
import { Avatar, Container, Grid, MenuItem } from "@mui/material";
import Menu from '@mui/material/Menu';
import './HomeStyle.css'


export interface IHomePageProps {
  children: any;
  routerHeader: any;
};
const drawerWidth = 260;
export interface IHomeProps {};
const Home: React.FunctionComponent<IHomePageProps> = ({ routerHeader, children }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [resolution, setResolution] = useState({ width: 0, height: 0 });
  
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

   return (
    <Box sx={{ display: 'flex', backgroundColor: '#F5F8FA', }} >
        <CssBaseline />
        <TopBar open={open} routerHeader={routerHeader} handleDrawerOpen={handleDrawerOpen} />
        {/* <SideBar Drawer={Drawer} DrawerHeader={DrawerHeader} open={open} theme={theme} handleDrawerClose={handleDrawerClose} /> */}
        <Box component="main" sx={{height: '100vh',width:"100%", flexGrow: 1, p: 0,backgroundColor: '#F5F8FA',paddingTop:"16px",overflowY: 'auto',overflowX: "hidden" }} >
          <DrawerHeader />
          <div style={resolution.width < 769 ? { height: 'calc(100vh - 100px)', background: '#F5F8FA' } : { height: 'calc(100vh - 70px)', background: '#F5F8FA' }}>
            <div style={resolution.width > 1025 ? { padding: "10px 30px", height: 'calc(100% - 20px)', overflowY: "auto", } : { padding: "20px 10px", height: 'calc(100% - 20px)', overflowY: "auto", }}>
              <div style={{ height: '100%' }}>{children}</div>
            </div>
          </div>
        </Box>
    </Box>
  )
};
export default Home;