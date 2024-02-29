import React, { useEffect, useState } from 'react';
import './ChildInfo.scss'
import { Avatar, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ModuleInfo from '../../module/moduleinfo/ModuleInfo';
import { io } from 'socket.io-client';
import { canceladdFriendbyreceiver, confirmaddfriend } from '../../../../services/friendService';
import { useDispatch, useSelector } from 'react-redux';
import { fechUserToken } from '../../../../redux/UserSlice';
import { handlesendtext } from '../../../../socket/socket';


const ChildInfo = (props) => {

    const { openSearch, setOpenModelsearch } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'))

    const mdalg = useMediaQuery(theme.breakpoints.between('md', 'lg'))

    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        if (sm || mdalg) {
            setOpen(true);
        } else {
            setOpen(false)
        }
    }
    const handleClose = () => setOpen(false);

    const handleconfirmAddfriend = async () => {
        let data = {
            phonesender: dataredux.phonenumber,
            phonereceiver: props.item.phonenumber
        }
        let res = await confirmaddfriend(data);
        if (res) {
            if (res.EC === 0) {
                await dispatch(fechUserToken())
                handlesendtext({ sender: dataredux.phonenumber, receiver: props.item.phonenumber })
            }
        }
    }

    const handlecancelfriendbyreceiver = async () => {
        let data = {
            phonesender: dataredux.phonenumber,
            phonereceiver: props.item.phonenumber
        }
        let res = await canceladdFriendbyreceiver(data);
        if (res) {
            if (res.EC === 0) {
                await dispatch(fechUserToken())
                handlesendtext({ sender: dataredux.phonenumber, receiver: props.item.phonenumber })
            }
        }
    }


    const firstInitial = props.item.firstname ? props.item.firstname.substring(0, 1).toUpperCase() : '';
    const lastInitial = props.item.lastname ? props.item.lastname.substring(0, 1).toUpperCase() : '';

    return (
        <Box className="child-chat-info-container">
            <Box
                width={sm ? "100%" : ""}
                className="child-chat-left"
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
                <Box className="child-chat-in-right">
                    <h5>
                        {props.item && `${props.item.firstname.toUpperCase()} ${props.item.lastname.toUpperCase()}`}
                    </h5>
                </Box>
            </Box>

            <Box
                display={sm || mdalg ? "none" : "block"}
                className="child-chat-right">
                <Button size='small' className='btn-confirm' variant="contained" endIcon={<CheckIcon />}
                    onClick={() => handleconfirmAddfriend()}
                >
                    Xác nhận
                </Button>
                <Button size='small' variant="outlined" startIcon={<CloseIcon />}
                    onClick={() => handlecancelfriendbyreceiver()}

                >
                    Hủy
                </Button>

            </Box>
            <ModuleInfo
                handleOpen={handleOpen}
                open={open}
                handleClose={handleClose}
                user={props.item}
                openSearch={openSearch}
                setOpenModelsearch={setOpenModelsearch}
            />
        </Box>
    );
};

export default ChildInfo;