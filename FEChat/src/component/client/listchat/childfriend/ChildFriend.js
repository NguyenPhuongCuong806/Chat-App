import React, { useEffect, useState } from 'react';
import './ChildFriend.scss'
import { Avatar, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import ModuleInfo from '../../module/moduleinfo/ModuleInfo';

const ChildFriend = (props) => {

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)
    const [click, setclick] = useState(false)


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const firstInitial = props.item.firstname ? props.item.firstname.substring(0, 1).toUpperCase() : '';
    const lastInitial = props.item.lastname ? props.item.lastname.substring(0, 1).toUpperCase() : '';

    return (
        <Box className={click === true ? "child-chat-friend-container active" : "child-chat-friend-container"}
        >
            <Box className="child-chat-body-left"
                onClick={() => handleOpen()}
            >
                <Box>
                    <Avatar
                        sx={{ width: 45, height: 45 }}
                    >
                        {
                            props.item ?
                                firstInitial + lastInitial
                                :
                                ""
                        }
                    </Avatar>
                </Box>
                <Box className="child-chat-right">
                    <h4>
                        {props.item && `${props.item.firstname.toUpperCase()} ${props.item.lastname.toUpperCase()}`}
                    </h4>
                </Box>
            </Box>
            <ModuleInfo
                handleOpen={handleOpen}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                user={props.item}
                textsearch={props.textsearch}
                handleCloses={props.handleCloses}
                userfriend={props.item}
            />
        </Box>
    );
};

export default ChildFriend;