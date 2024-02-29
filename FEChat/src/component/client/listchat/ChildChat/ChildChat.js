import { Avatar, AvatarGroup, Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ChildChat.scss'
import GroupsIcon from '@mui/icons-material/Groups';
import { useDispatch, useSelector } from 'react-redux';
import { handlerefreshMessange } from '../../../../socket/socket';


const ChildChat = (props) => {

    const { user, listchatall, handleupdateData } = props;
    const dataredux = useSelector((state) => state.userisaccess.account)
    const [updateuser, setupdateuser] = useState({});

    useEffect(() => {
        if (user) {
            setupdateuser(user)
        }
    }, [])

    useEffect(() => {
        if (user) {
            setupdateuser(user)
        }
    }, [])


    useEffect(() => {
        handlerefreshMessange(() => {
            handleupdateData()
        })
    }, [user])

    const firstInitial = user && user.firstname ? user.firstname.substring(0, 1).toUpperCase() : '';
    const lastInitial = user && user.lastname ? user.lastname.substring(0, 1).toUpperCase() : '';


    return (
        <Box className={user && user.click ? "child-chat-container active" : "child-chat-container"} >
            <Box>
                {
                    user && user.firstname && user.lastname
                        ?
                        <Avatar
                            sx={{ width: 45, height: 45 }}
                        >
                            {
                                user ?
                                    firstInitial + lastInitial
                                    :
                                    ""
                            }
                        </Avatar> :
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                                width: "80px"
                            }}
                        >
                            <AvatarGroup max={4}>
                                {user && user.members && user.members.length > 0 &&
                                    user.members.slice(0, 3).map((member, index) => {
                                        const firstInitials = member && member.firstname ? member.firstname.substring(0, 1).toUpperCase() : '';
                                        const lastInitials = member && member.lastname ? member.lastname.substring(0, 1).toUpperCase() : '';
                                        return (
                                            <Avatar
                                                sx={{ width: 30, height: 30 }}
                                            >
                                                {
                                                    user ?
                                                        firstInitials + lastInitials
                                                        :
                                                        ""
                                                }
                                            </Avatar>
                                        )
                                    }
                                    )}
                            </AvatarGroup>
                            {user && user.members && user.members.length > 0 && (
                                <Avatar alt={`+${user.members.length}`} sx={{ width: 30, height: 30, backgroundColor: '#fff', color: '#000' }}>
                                    <Typography variant="body2">
                                        +{user.members.length}
                                    </Typography>
                                </Avatar>
                            )}
                        </Box>


                }


            </Box>
            <Box className="child-chat-right">
                <Box className="child-name-big">
                    {
                        user && user.firstname && user.lastname ?
                            <h4>
                                {user && `${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                            </h4>
                            : <>
                                <GroupsIcon
                                    sx={{
                                        marginRight: 1
                                    }}
                                    color='disabled'
                                />
                                <h4>
                                    {user && `${user.name}`}
                                </h4>
                            </>

                    }


                </Box>
                <Box>
                    {
                        user && user.firstname && user.lastname ?
                            <span
                                className='text-chat-exp'
                            >
                                {
                                    user && user.sender === dataredux._id
                                        ?
                                        <>
                                            Bạn:{user.contentfinal}
                                        </>
                                        :
                                        <>
                                            {user.contentfinal}
                                        </>
                                }
                            </span>
                            :
                            <span
                                className='text-chat-exp'
                            >
                                {
                                    user && user.sender && user.sender._id === dataredux._id
                                        ?
                                        <>
                                            Bạn:{user.contentfinal}
                                        </>
                                        :
                                        <>
                                            {user.sender.firstname} {user.sender.lastname}:{user.contentfinal}
                                        </>
                                }
                            </span>
                    }

                </Box>
            </Box>
        </Box>
    );
};

export default ChildChat;