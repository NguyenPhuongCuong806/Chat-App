import React, { useEffect, useRef, useState } from 'react';
import './ChatInfo.scss'
import { Box } from '@mui/material';
import ChatInforTop from '../chatinfo/top/ChatInforTop'
import ChatInforBottom from '../chatinfo/bottom/ChatInforBottom'
import ChatInforCenter from '../chatinfo/center/ChatInforCenter'

import { useSelector } from 'react-redux';
import { getAllChatPrivate, getAllGroupMessangebyGroupId } from '../../../services/chatService';
import { handlerefreshMessange, handlerefreshMessangeingroup, handlerefreshMessangesennder, handleroffefreshMessange } from '../../../socket/socket';


const ChatInfo = (props) => {

    const { userfriend, listchat, setlistchat, skip, setskip, hasMore, setHasMore, currentgroup } = props
    const dataredux = useSelector((state) => state.userisaccess.account);
    const user = useRef({});

    useEffect(() => {
        if (user.current && user.current.length > 0) {
            if (user.current[0].phonenumber) {
                handlerefreshMessange(async (data) => {
                    if (data.phone === user.current[0].phonenumber) {
                        await handlegetAllchatprivate()
                    }
                })
                handlerefreshMessangesennder(async () => {
                    await handlegetAllchatprivate()
                })
            } else {
                handlerefreshMessangeingroup(async (data) => {
                    if (data.groupId === user.current[0]._id) {
                        await handlegetAllchatgroup()
                    }
                })

            }

        }
    }, [user.current[0]])

    useEffect(() => {
        if (userfriend && userfriend.length > 0) {
            let data = userfriend.filter((item) => item.click === true)
            user.current = data
        }
    }, [userfriend])

    const handlegetAllchatprivate = async () => {
        let data = {
            phonesender: dataredux.phonenumber,
            phonereceiver: user.current[0].phonenumber,
            skip: 0
        }
        let res = await getAllChatPrivate(data)
        if (res) {
            if (res.EC === 0) {
                setskip(6)
                setHasMore(true)
                setlistchat(res.DT.reverse())
            }
        }

    }

    const handlegetAllchatgroup = async () => {
        let res = await getAllGroupMessangebyGroupId({ id: user.current[0]._id, skip: 0 })
        if (res) {
            if (res.EC === 0) {
                setskip(6)
                setHasMore(true)
                setlistchat(res.DT.reverse())
            }
        }

    }


    return (
        <Box className='chat-info-container'>
            <Box className="chat-info-top">
                <ChatInforTop
                    user={user.current}
                />
            </Box>
            <Box className="chat-info-center"
            >
                <ChatInforCenter
                    user={user.current}
                    listchat={listchat}
                    setlistchat={setlistchat}
                    skip={skip}
                    setskip={setskip}
                    hasMore={hasMore}
                    setHasMore={setHasMore}
                />
            </Box>
            <Box className="chat-info-bottom">
                <ChatInforBottom
                    user={user.current}
                    setlistchat={setlistchat}
                    handlegetAllchatprivate={handlegetAllchatprivate}
                    getAllChatInfo={props.getAllChatInfo}

                />
            </Box>
        </Box>
    );
};

export default ChatInfo;