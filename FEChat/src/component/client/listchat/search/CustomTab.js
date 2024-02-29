import { Box, Fab, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import './CustomTab.scss'
import { useDispatch, useSelector } from 'react-redux';

const CustomTab = () => {

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    return (
        <Box className='custom-container' color="inherit" sx={{ p: '10px' }} aria-label="directions">
            <NotificationsActiveIcon />

            {
                dataredux &&
                    dataredux.listaddfriend && dataredux.listaddfriend.length > 0
                    ?
                    <Box className="number-container"
                    >
                        <span className="text-index">
                            {
                                dataredux.listaddfriend.length
                            }
                        </span>
                    </Box>
                    :
                    <>
                    </>
            }

        </Box>
    );
};

export default CustomTab;