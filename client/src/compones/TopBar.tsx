import React, { useEffect, useState } from "react";
import { IChildrenRouter } from "../interface/Router.interface";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo/pillars.png";
import { routesConfig } from "../router/RounterConfig";
import Grid from "@mui/material/Grid2";
import Cookies from "js-cookie";
export interface ITopBarProps {
  DrawerHeader: any;
  open: any;
  handleDrawerClose: any;
}

export interface miniChilden {
  name: string;
  path: string;
}

export interface Childen {
  name: string;
  path: string;
  childens: IChildrenRouter[];
  icon?: any;
}

export interface MenuSideBar {
  name: string;
  path: string;
  childens: Childen[];
  icon: any;
}

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboards", path: "/dashboards" },
  { name: "Logout", path: "/login" }, // กำหนด path ของ Logout ไปที่ /login
];

const TopBar: React.FunctionComponent<ITopBarProps> = ({ open }) => {
  const [sidebar, setSidebar] = useState<MenuSideBar[]>([]);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setRouter();
  }, []);

  const setRouter = async () => {
    let temp: any[] = [];
    if (routesConfig["privateRoute"] !== undefined) {
      for await (const item of routesConfig["privateRoute"]) {
        if (item.children !== undefined) {
          let inputchildren: Childen[] = [];

          let input: MenuSideBar = {
            name: item.name ?? "",
            path: item.path ?? "",
            childens: inputchildren,
            icon: item.icon,
          };

          for await (const itemchildren of item.children) {
            let inputChildrenmini: IChildrenRouter[] =
              itemchildren?.children ?? [];

            let ch: Childen = {
              name: itemchildren.name ?? "",
              path: itemchildren.path ?? "",
              childens: inputChildrenmini,
              icon: itemchildren?.icon,
            };
            if (itemchildren?.subpath === false) {
              input.childens.push(ch);
            }
          }

          temp.push(input);
        }
      }
    }

    setSidebar(temp);
  };

  const handleMenuClick = (path: string) => {
    setAnchorElUser(null);
    if (path === "/login") {
      // เพิ่ม logic การ logout ที่นี่ เช่น การล้าง token หรือข้อมูลของผู้ใช้
    }
    navigate(path);
  };

  return (
    <>
      <AppBar
        position="fixed"
        style={{
          background: "linear-gradient(to right, #D8BFD8, #FFEBCD)",
          borderRadius: "10px",
        }}
      >
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
              component="a"
              href="#"
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
              <IconButton size="large" aria-label="open menu" color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {sidebar.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.path)}
                  sx={{
                    my: 2,
                    color: "#8B0000",
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Grid container flexDirection={"column"} sx={{ alignItems: "end" }} marginRight={2}>
              <Typography sx={{color:"black"}}>{Cookies.get('acountname')}</Typography>
            </Grid>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src={""} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleMenuClick(setting.path)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default TopBar;
