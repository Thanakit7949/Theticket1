import React, { useEffect, useState } from 'react';
import { IChildrenRouter } from '../interface/Router.interface';
import { useNavigate } from 'react-router-dom';
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
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo/pillars.png'; 

export interface ITopBarProps {
    DrawerHeader: any;
    open: any;
    handleDrawerClose: any;
}

export interface MenuSideBar {
    name: string;
    path: string;
    childens: IChildrenRouter[];
    icon: any;
}

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const TopBar: React.FunctionComponent<ITopBarProps> = ({}) => {

    const [sidebar, setSidebar] = useState<MenuSideBar[]>([]);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
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
        const temp: MenuSideBar[] = [];
        if (routes !== undefined) {
            for await (const item of routes) {
                if (item.children) {
                    let inputchildren = item.children.map((child: { name: any; path: any; children: any; }) => ({
                        name: child.name,
                        path: child.path,
                        childens: child.children || []
                    }));
                    temp.push({
                        name: item.name,
                        path: item.path,
                        childens: inputchildren,
                        icon: item.icon
                    });
                }
            }
            setSidebar(temp);
        }
    };

    return (
        <>
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
                    marginBottom: "-50px",
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
                            animationPlayState: "paused",
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
                            <IconButton
                                size="large"
                                aria-label="open menu"
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {sidebar.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => navigate(page.path)}
                                    sx={{ my: 2, color: "#8B0000", display: "block", fontSize: "16px", fontWeight: "bold" }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" src={''} />
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
        </>
    );
};

export default TopBar;
