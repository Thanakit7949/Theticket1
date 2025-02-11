import React, { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import TopBar from "../compones/TopBar";
import { CssBaseline } from "@mui/material";

export interface IHomProps {
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

const Home: React.FunctionComponent<IHomProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [resolution, setResolution] = useState({ width: 0, height: 0 });
  // const isMobile = useIsMobile()

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    //  <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#F5F8FA" , marginTop:6 }}>
     <Box sx={{ display: "flex", height: "100vh" , marginTop:6 }}>
      <CssBaseline />
      <TopBar
          DrawerHeader={DrawerHeader}
          open={open}
          handleDrawerClose={handleDrawerClose}
        />
          {children}
    </Box>
  );
};
export default Home;
