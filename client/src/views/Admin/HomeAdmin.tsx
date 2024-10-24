import { Typography } from '@mui/material';
import React from 'react';
import Sidebar from '../../compones/Sidebar';
export interface IHomeAdminProps {};
const HomeAdmin: React.FunctionComponent<IHomeAdminProps> = props => {
    return(
        <>
        <Sidebar/>
        <Typography>{"admin"}</Typography>
        </>
    );
};
export default HomeAdmin;