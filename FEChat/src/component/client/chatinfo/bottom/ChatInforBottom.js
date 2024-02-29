import React, { useEffect, useState } from 'react';
import './ChatInforBottom.scss'
import { Box, Divider, FormControl, IconButton, InputLabel, OutlinedInput, Paper } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import SendIcon from '@mui/icons-material/Send';
import { getAllChatPrivate, getAllGroupMessangebyGroupId, sendmessangeingroup, sendmessangeprivate } from '../../../../services/chatService';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { handlerefreshMessange, handlsendmessange, handlsendmessangeingroup } from '../../../../socket/socket';

const ChatInforBottom = (props) => {

    const { user, setlistchat } = props

    const [userinfo, setuserinfo] = useState({});
    const [chat, setchat] = useState("");

    useEffect(() => {
        if (user && user.length > 0)
            setuserinfo(user[0])
    }, [user])

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const handleSendChat = async (e) => {
        if (e.key === 'Enter') {
            if (chat) {
                if (userinfo && userinfo.phonenumber) {
                    let data = {
                        phonesender: dataredux.phonenumber,
                        phonereceiver: userinfo.phonenumber,
                        content: chat
                    }
                    let res = await sendmessangeprivate(data)
                    if (res) {
                        if (res.EC === 0) {
                            setchat("")
                            handlsendmessange({ sender: dataredux.phonenumber, receiver: userinfo.phonenumber })
                        }
                    }
                } else {
                    let data = {
                        phonesender: dataredux.phonenumber,
                        groupId: userinfo._id,
                        content: chat
                    }
                    let res = await sendmessangeingroup(data)
                    if (res) {
                        if (res.EC === 0) {
                            setchat("")

                            handlsendmessangeingroup({ groupId: userinfo._id })
                        }
                    }

                }

            }
        }
    }


    return (
        <Paper className='chat-infor-bottom-container'>
            <Box className="chat-infor-bottom-child-top">
                <IconButton color="default">
                    <InsertPhotoIcon />
                </IconButton>
                <IconButton color="default">
                    <StickyNote2Icon />
                </IconButton>
                <IconButton color="default">
                    <AttachFileIcon />
                </IconButton>
                <IconButton color="default">
                    <AnnouncementIcon />
                </IconButton>
                <IconButton color="default">
                    <AlarmOnIcon />
                </IconButton>
            </Box>
            <Box className="chat-infor-bottom-child-bottom">
                <OutlinedInput className='chat-infor-bottom-child-text'
                    placeholder="Nhập @, tin nhắn tới thằng ..."
                    onKeyDown={(e) => handleSendChat(e)}
                    value={chat}
                    onChange={(e) => setchat(e.target.value)}
                />
            </Box>
        </Paper>
    );
};

export default ChatInforBottom;