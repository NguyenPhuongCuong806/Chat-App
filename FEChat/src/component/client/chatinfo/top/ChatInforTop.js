import React, { useEffect, useState } from 'react';
import './ChatInforTop.scss'
import { Avatar, AvatarGroup, Box, IconButton, Paper, Typography } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideocamIcon from '@mui/icons-material/Videocam';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const ChatInforTop = (props) => {

    const { user } = props

    const [userinfo, setuserinfo] = useState({});

    useEffect(() => {
        if (user && user.length > 0)
            setuserinfo(user[0])
    }, [user])


    const firstInitial = userinfo.firstname ? userinfo.firstname.substring(0, 1).toUpperCase() : '';
    const lastInitial = userinfo.lastname ? userinfo.lastname.substring(0, 1).toUpperCase() : '';

    return (
        <Paper component="form" className='chat-infor-top-container'>
            <Box className="chat-info-top-left">
                {
                    userinfo && userinfo.firstname && userinfo.lastname
                        ?
                        <>
                            <Box>
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
                            <Box className="chat-info-top-left-text">
                                <h4>
                                    {userinfo && `${userinfo.firstname} ${userinfo.lastname}`}
                                </h4>
                            </Box>
                        </>
                        :
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    width: "80px"
                                }}
                            >
                                <AvatarGroup max={4}>
                                    {userinfo && userinfo.members && userinfo.members.length > 0 &&
                                        userinfo.members.slice(0, 3).map((member, index) => {
                                            const firstInitials = member && member.firstname ? member.firstname.substring(0, 1).toUpperCase() : '';
                                            const lastInitials = member && member.lastname ? member.lastname.substring(0, 1).toUpperCase() : '';
                                            return (
                                                <Avatar
                                                    sx={{ width: 30, height: 30 }}
                                                >
                                                    {
                                                        userinfo ?
                                                            firstInitials + lastInitials
                                                            :
                                                            ""
                                                    }
                                                </Avatar>
                                            )
                                        }
                                        )}
                                </AvatarGroup>
                                {userinfo && userinfo.members && userinfo.members.length > 0 && (
                                    <Avatar alt={`+${userinfo.members.length}`} sx={{ width: 30, height: 30, backgroundColor: '#e6e8ea', color: '#000' }}>
                                        <Typography variant="body2">
                                            +{userinfo.members.length}
                                        </Typography>
                                    </Avatar>
                                )}
                            </Box>
                            <Box className="chat-info-top-left-text">
                                <h4>
                                    {userinfo && `${userinfo.name}`}
                                </h4>
                                <span className='text'>
                                    <PermIdentityIcon />
                                    {userinfo && userinfo.members && userinfo.members.length} thành viên
                                </span>
                            </Box>
                        </>
                }

            </Box>
            <Box>
                <IconButton color="primary">
                    <GroupAddIcon />
                </IconButton>
                <IconButton color="primary">
                    <VideocamIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default ChatInforTop;