import React, { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { CssBaseline } from "@mui/material";
import TopBarD from "../compones/TopBarD";

interface HomeIsAdminProps {
    children: any;
    routerHeader: any;
}

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#F5F8FA",
    ...theme.mixins.toolbar,
  }));
const HomeIsAdmin: React.FunctionComponent<HomeIsAdminProps> = ({ children }) => {
     const [open, setOpen] = useState(true);
       const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  
    return (
        <Box sx={{ display: "flex", height: "100vh" , marginTop:6 }}>
      <CssBaseline />
      <TopBarD
          DrawerHeader={DrawerHeader}
          open={open}
          handleDrawerClose={handleDrawerClose}
        />
          {children}
    </Box>
    );
};

export default HomeIsAdmin;