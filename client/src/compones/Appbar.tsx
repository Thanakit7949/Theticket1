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
import MovieIcon from "@mui/icons-material/Movie";
import MenuIcon from "@mui/icons-material/Menu";
import Photo from "../assets/react.svg";
import HomeTest from "../views/User/HomeTest";
import Concert from "../views/User/Concert";
import Sport from "../views/User/Sport";
import Promotion from "../views/User/Promotion";
import Product from "../views/User/Product";
import Information from "../views/User/Information";

const pages = ["Concert", "Sport", "Promotion", "Product", "Information"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];


const AppBarT: React.FunctionComponent = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [activePage, setActivePage] = useState<string>("Concert");
  const [isPaused, setIsPaused] = React.useState(false);

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

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <>
    {/* Scrolling Text with MUI components */}
    <Box 
      component="div" 
      sx={{ 
        position: "relative",
        width: "100%", 
        height: "90px",
        overflow: "hidden", 
        backgroundColor: "#FFC0CB",
        py: 2, 
        px: 4, 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        borderRadius: "12px", 
        boxShadow: "0 4px 15px rgba(255, 182, 193, 0.5)", 
        marginBottom: "20px",
        marginTop: "60px",
       
      }}
    >
      <Typography 
        component="p" 
        sx={{ 
          position: "absolute", 
          whiteSpace: "nowrap", 
          fontSize: "45px", 
          fontFamily: "'Quicksand', sans-serif", 
          fontWeight: "bold", 
          color: "#FFFFFF", 
          textShadow: "2px 2px 8px rgba(247, 45, 89, 0.3)", 
          left: "100%", 
          animation: "marquee 20s linear infinite", 
          "&:hover": {
            animationPlayState: "paused", // หยุดแอนิเมชันเมื่อเมาส์ไปอยู่บนข้อความ
          },
          "@keyframes marquee": {
            "0%": { left: "100%" },
            "100%": { left: "-100%" }
          }
        }}
      >
        Welcome to the INTERGETHER CONCERTS & SPORTS! Enjoy the best events and experiences.
      </Typography>
    </Box>


      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MovieIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              onClick={() => setActivePage("Home")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
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
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      setActivePage(page);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => setActivePage(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={Photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ mt: 10, p: 3 }}>
  {activePage === "Home" && <HomeTest />}
  {activePage === "Concert" && <Concert />}
  {activePage === "Sport" && <Sport />}
  {activePage === "Promotion" && <Promotion />}
  {activePage === "Product" && <Product />}
  {activePage === "Information" && <Information />}
</Box>
    </>
  );
};

export default AppBarT;
