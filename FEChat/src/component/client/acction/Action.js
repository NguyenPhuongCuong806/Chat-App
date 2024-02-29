import React, { useEffect, useState } from 'react';
import "./Action.scss"
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CloudIcon from '@mui/icons-material/Cloud';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { deepOrange } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import MenuAccount from './menu/MenuAccount';

const Action = (props) => {

    const dispatch = useDispatch()
    const dataredux = useSelector((state) => state.userisaccess);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [userinfo, setuserinfo] = useState({});

    useEffect(() => {
        if (dataredux && dataredux.account) {
            setuserinfo(dataredux.account)
        }
    }, [])


    const firstInitial = userinfo.firstname ? userinfo.firstname.substring(0, 1).toUpperCase() : '';
    const lastInitial = userinfo.lastname ? userinfo.lastname.substring(0, 1).toUpperCase() : '';

    return (
        <Box
            sx={{
                height: "100vh",
                backgroundColor: "#0091ff"
            }}
        >
            <Box
                sx={{
                    height: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{
                            height: "50px",
                            width: "50px"
                        }}>
                            {
                                userinfo ?
                                    firstInitial + lastInitial
                                    :
                                    ""
                            }
                        </Avatar>
                    </IconButton>
                </Tooltip>

            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "90%"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    }}
                >
                    <IconButton color="#ffffff" size='large'
                        onClick={() => props.setshowchat(false)}
                    >
                        <ChatIcon fontSize='inherit' color='#ffffff' />
                    </IconButton>
                    <IconButton color="#eceff1" size='large'>
                        <PermContactCalendarIcon fontSize='inherit' />
                    </IconButton>
                    <IconButton color="#eceff1" size='large'>
                        <PlaylistAddCheckIcon fontSize='inherit' />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        marginTop: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around"
                    }}
                >
                    <IconButton color="#eceff1" size='large'>
                        <CloudIcon fontSize='inherit' />
                    </IconButton>
                    <IconButton color="#eceff1" size='large'>
                        <HomeRepairServiceIcon fontSize='inherit' />
                    </IconButton>
                    <IconButton color="#eceff1" size='large'>
                        <SettingsIcon fontSize='inherit' />
                    </IconButton>
                </Box>
            </Box>
            <MenuAccount
                handleClose={handleClose}
                handleClick={handleClick}
                open={open}
                anchorEl={anchorEl}
            />
        </Box>
    );
};

export default Action;