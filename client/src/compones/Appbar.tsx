import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Routes, Route } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Photo from "../assets/react.svg";
import HomeTest from "../views/User/HomeTest";
import Concert from "../views/User/Concert";
import Sport from "../views/User/Sport";
import Promotion from "../views/User/Promotion";
import Product from "../views/User/Product";
import Information from "../views/User/Information";
import Profile from "../views/User/Profile";
import logo from '../assets/logo/pillars.png';
import Dashboard from "../views/User/Dashboard";
import Account from "../views/User/Account";
import Dashboards from "../views/Admin/Dashboards";
import Sidebar from "../views/Admin/sidebar";


const pages = [
  { name: "Concert", path: "/concert" },
  { name: "Sport", path: "/sport" },
  { name: "Promotion", path: "/promotion" },
  { name: "Product", path: "/product" },
  { name: "Information", path: "/information" },
];
const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboards", path: "/dashboards" },
  { name: "Logout", path: "/logout" }
];

const AppBarT: React.FunctionComponent = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ background: 'linear-gradient(to right, #D8BFD8, #FFEBCD)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                width: 30,
                height: 30,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              INTERGETHER
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name} // Use `page.name` as a unique key
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.path}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}

                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name} // Use `setting.name` as a unique key
                    onClick={handleCloseUserMenu}
                    component={RouterLink}
                    to={setting.path}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ mt: 10, p: 3 }}>
        <Routes>
          <Route path="/" element={<HomeTest />} />
          <Route path="/concert" element={<Concert />} />
          <Route path="/sport" element={<Sport />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/product" element={<Product />} />
          <Route path="/information" element={<Information />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboards" element={<Dashboards />} />  
          <Route path="/sidebar" element={<Sidebar />} />  
           

        </Routes>
      </Box>
    </>
  );
};

export default AppBarT;
