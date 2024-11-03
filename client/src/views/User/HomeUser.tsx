import React from 'react';
import Appbar from '../../compones/Appbar.tsx';
import Information from './Information.tsx';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
export interface IHomeUserProps {};
const HomeUser: React.FunctionComponent<IHomeUserProps> = props => {
    return(
        <>
           

<Grid container >
    <Grid size={{md:12,xs:12}}>
    <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "90px",
                    backgroundColor: "#FFC0CB",
                    py: 1,
                    px: 100,
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(255, 182, 193, 0.5)",
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
    </Grid>
</Grid>
<Grid container >
    <Grid size={{md:8,xs:12}} sx={{ bgcolor: "#FFC0CB",border:'1px solid red'}}>
  
    </Grid>
    <Grid size={{md:4,xs:12}}  sx={{ bgcolor: "#FFC0CB",border:'1px solid green'}}>
  
    </Grid>
</Grid>

         
        </>
    );
};
export default HomeUser;