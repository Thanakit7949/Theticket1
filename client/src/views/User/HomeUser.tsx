import React from 'react';
import Appbar from '../../compones/Appbar.tsx';
export interface IHomeUserProps {};
const HomeUser: React.FunctionComponent<IHomeUserProps> = props => {
    return(
        <>
         <Appbar/>
        </>
    );
};
export default HomeUser;