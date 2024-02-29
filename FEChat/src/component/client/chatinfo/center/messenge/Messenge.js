import { Avatar, Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Messenge.scss'

const Messenge = (props) => {
    const { item, user } = props;

    const [userinfo, setuserinfo] = useState({});

    useEffect(() => {
        if (user && user.length > 0) {
            setuserinfo(user[0])
        }
    }, [])

    useEffect(() => {
        if (user && user.length > 0) {
            setuserinfo(user[0])
        }
    }, [user])


    const senderInfo = item && item.sender ? item.sender : {};

    const firstInitial = userinfo && userinfo.firstname
        ? userinfo.firstname.substring(0, 1).toUpperCase()
        : senderInfo && senderInfo.firstname
            ? senderInfo.firstname.substring(0, 1).toUpperCase()
            : "";

    const lastInitial = userinfo && userinfo.lastname
        ? userinfo.lastname.substring(0, 1).toUpperCase()
        : senderInfo && senderInfo.lastname
            ? senderInfo.lastname.substring(0, 1).toUpperCase()
            : "";
    return (
        <Box className="messenge-container">
            <Box className="avatar-messenge">
                <Avatar
                    sx={{ width: 45, height: 45 }}
                >
                    {
                        userinfo ?
                            firstInitial + lastInitial
                            :
                            ""
                    }
                </Avatar>
            </Box>
            <Box className="info-messenge">
                <Paper className='form-text'>
                    <span className='text'>
                        {item && item.content}
                    </span>
                </Paper>
            </Box>
        </Box>
    );
};

export default Messenge;