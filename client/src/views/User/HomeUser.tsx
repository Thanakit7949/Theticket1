import { Typography } from '@mui/material';
import React from 'react';
import Sidebar from '../../compones/Sidebar';
export interface IHomeUserProps {};
const HomeUser: React.FunctionComponent<IHomeUserProps> = props => {
    return(
        <>
         <Sidebar/>
        <Typography>{"user"}</Typography>
        </>
    );
};
export default HomeUser;