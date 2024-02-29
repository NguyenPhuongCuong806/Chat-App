import { Avatar, Box, Button, Container, IconButton, Modal, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ModuleInfo.scss'
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { canceladdFriendbyreceiver, canceladdfriend, cancelsendaddFriend, confirmaddfriend, sendaddFriend } from '../../../../services/friendService';
import { fechUserToken } from '../../../../redux/UserSlice'
import { io } from "socket.io-client";
import Home from '../../home/Home';
import { handlesendtext } from '../../../../socket/socket';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const ModuleInfo = (props) => {

    const { open, handleClose, user, setOpen, setOpenModelsearch } = props;
    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)
    const [status, setstatus] = useState(3)

    const theme = useTheme();


    const handlestatus = () => {
        dispatch(fechUserToken())
        if (dataredux && user) {
            if (dataredux.phonenumber.localeCompare(user.phonenumber) === 0) {
                setstatus(0)
            } else {
                let index = dataredux.listsendaddfriend &&
                    dataredux.listsendaddfriend.findIndex((item) => item.phonenumber.localeCompare(user.phonenumber) === 0)
                if (index !== -1) {
                    setstatus(1)
                }
                let index2 = dataredux.listfriend &&
                    dataredux.listfriend.findIndex((item) => item.phonenumber.localeCompare(user.phonenumber) === 0)
                if (index2 !== -1) {
                    setstatus(2)
                }
                let index3 = dataredux.listaddfriend
                    && dataredux.listaddfriend.findIndex((item) => item.phonenumber.localeCompare(user.phonenumber) === 0)
                if (index3 !== -1) {
                    setstatus(4)
                }
            }
        }
    }

    useEffect(() => {
        handlestatus()
    }, [])


    const handleAddfriend = async () => {
        let data = {
            phonesender: dataredux.phonenumber,
            phonereceiver: user.phonenumber
        }
        let res = await sendaddFriend(data);
        if (res) {
            if (res.EC === 0) {
                await dispatch(fechUserToken())
                handlesendtext({ sender: dataredux.phonenumber, receiver: user.phonenumber })
                setstatus(1)
            }
        }
    }

    const handleCancelAddfriend = async () => {
        let data = {
            phonesender: dataredux.phonenumber,
            phonereceiver: user.phonenumber
        }
        let res = await cancelsendaddFriend(data);
        if (res) {
            if (res.EC === 0) {
                await dispatch(fechUserToken())
                handlesendtext({ sender: dataredux.phonenumber, receiver: user.phonenumber })

                setstatus(3)
            }
        }
    }

    const handlecancelfriendbyreceiver = async () => {
        let data = {
            phonesender: dataredux.phonenumber,
            phonereceiver: user.phonenumber
        }
        let res = await canceladdFriendbyreceiver(data);
        if (res) {
            if (res.EC === 0) {
                await dispatch(fechUserToken())
                handlesendtext({ sender: dataredux.phonenumber, receiver: user.phonenumber })

                setstatus(3)
            }
        }
    }

    const handleconfirmAddfriend = async () => {
        let data = {
            phonesender: dataredux.phonenumber,
            phonereceiver: user.phonenumber
        }
        let res = await confirmaddfriend(data);
        if (res) {
            if (res.EC === 0) {
                await dispatch(fechUserToken())
                handlesendtext({ sender: dataredux.phonenumber, receiver: user.phonenumber })
                setstatus(2)
            }
        }
    }

    const handleCancelfriend = async () => {
        let data = {
            phonesender: dataredux.phonenumber,
            phonereceiver: user.phonenumber
        }
        let res = await canceladdfriend(data);
        if (res) {
            if (res.EC === 0) {
                await dispatch(fechUserToken())
                handlesendtext({ sender: dataredux.phonenumber, receiver: user.phonenumber })

                setstatus(3)
            }
        }
    }

    const sm = useMediaQuery(theme.breakpoints.down('sm'))

    const firstInitial = user.firstname ? user.firstname.substring(0, 1).toUpperCase() : '';
    const lastInitial = user.lastname ? user.lastname.substring(0, 1).toUpperCase() : '';

    const handleSendMessange = () => {
        setOpen(false)
        props.handleCloses()
    }

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleClose}
            >
                <Container>
                    <Box sx={style}
                        width={sm ? "80%" : 400}
                        borderRadius={2}
                    >
                        <Box className="module-info-title">
                            <h3>Thông tin tài khoản</h3>
                            <IconButton color='primary' aria-label="delete" size="large"
                                onClick={() => handleClose()}
                            >
                                <CancelIcon />
                            </IconButton>
                        </Box>
                        <br />
                        <Box className="module-info-top">
                            <Box className="module-info-name">
                                <Avatar
                                    sx={{ width: 50, height: 50, marginRight: 1 }}
                                >
                                    {
                                        user ?
                                            firstInitial + lastInitial
                                            :
                                            ""
                                    }
                                </Avatar>
                                <h4>
                                    {user && user.firstname && user.lastname && `${user.firstname} ${user.lastname}`}
                                </h4>
                            </Box>
                            <Box className="module-info-buttom">
                                {
                                    status === +3 ?
                                        <Button sx={{ width: "45%" }} variant="outlined"
                                            onClick={() => handleAddfriend()}
                                        >Kết bạn</Button>
                                        : status === +1 ?
                                            <Button sx={{ width: "45%" }} variant="outlined"
                                                onClick={() => handleCancelAddfriend()}
                                            >Hủy lời mời</Button>
                                            : status === +2 ?
                                                <Button sx={{ width: "45%" }} variant="outlined"
                                                    onClick={() => handleCancelfriend()}
                                                >Hủy kết bạn</Button>
                                                :
                                                status === +4 ?
                                                    <>
                                                        <Button sx={{ width: "45%" }} variant="outlined"
                                                            onClick={() => handleconfirmAddfriend()}
                                                        >Đồng ý Kết bạn</Button>
                                                        <Button sx={{ width: "45%" }} variant="outlined"
                                                            onClick={() => handlecancelfriendbyreceiver()}
                                                        >Hủy</Button>
                                                    </>
                                                    :
                                                    <></>
                                }
                                {
                                    status !== +0 && status !== +4 ?
                                        <Button sx={{ width: "45%" }} variant="contained"
                                            onClick={() => handleSendMessange()}
                                        >Nhắn tin</Button>
                                        :
                                        <></>
                                }
                            </Box>
                            {
                                status === +4 ?
                                    <Button sx={{ width: "100%", marginBottom: 1 }} variant="contained"
                                        onClick={() => handleSendMessange()}
                                    >Nhắn tin</Button>
                                    :
                                    <></>
                            }

                        </Box>
                        <Box className="module-info-bottom">
                            <h4>Thông tin cá nhân</h4>
                            <Box className="module-info-bt-ifo">
                                <span className='text'>
                                    Tên
                                </span>
                                <Box>
                                    {user && user.firstname && user.lastname && `${user.firstname} ${user.lastname}`}
                                </Box>
                            </Box>
                            <Box className="module-info-bt-ifo">
                                <span className='text'>
                                    Số điện thoại
                                </span>
                                <Box>
                                    {user && user.phonenumber}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Modal>
        </>
    );
};

export default ModuleInfo;