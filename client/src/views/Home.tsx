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
//   height: 80,
//   padding: theme.spacing(0, 1),
  backgroundColor: "#F5F8FA",
  // necessary for content to be below app bar
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
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#F5F8FA" }}>
      <CssBaseline />
      <TopBar
          DrawerHeader={DrawerHeader}
          open={open}
          handleDrawerClose={handleDrawerClose}
        />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          height: "100vh",
          padding: "16px",
        }}
      >
        <DrawerHeader />
        <Box sx={{ flexGrow: 1, overflowY: "auto", width: "100%" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default Home;
