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
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo/pillars.png";
import { routesConfigD } from "../router/RounterConfigD";
import Grid from "@mui/material/Grid2";
import Cookies from "js-cookie";

export interface ITopBarProps {
  onNavigate: (path: string) => void;
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
  { name: "Dashboards", path: "/HomeAdmin" },
  { name: "Logout", path: "/login" }, // กำหนด path ของ Logout ไปที่ /login
];

const TopBarD: React.FunctionComponent<ITopBarProps> = ({ onNavigate }) => {
  const [sidebar, setSidebar] = useState<MenuSideBar[]>([]);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    setRouter();
  }, []);

  const setRouter = async () => {
    let temp: any[] = [];
    if (routesConfigD["privateRoute"] !== undefined) {
      for await (const item of routesConfigD["privateRoute"]) {
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
    onNavigate(path);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {sidebar.map((page) => (
          <ListItem button key={page.name} onClick={() => onNavigate(page.path)}>
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {settings.map((setting) => (
          <ListItem button key={setting.name} onClick={() => handleMenuClick(setting.path)}>
            <ListItemText primary={setting.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
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
              Dashboard
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
                  onClick={() => onNavigate(page.path)}
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

export default TopBarD;
