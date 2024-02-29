import React, { useEffect, useState, useRef } from 'react';
import './ChatInforCenter.scss'
import { Box } from '@mui/material';
import Messenge from './messenge/Messenge';
import Mymessenge from './messenge/Mymessenge';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";

import { getAllChatPrivate, getAllGroupMessangebyGroupId } from '../../../../services/chatService';

const ChatInforCenter = (props) => {

    const { skip, setskip, hasMore, setHasMore } = props

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)
    const bottomRef = useRef()
    const { user, listchat, setlistchat } = props;

    const fetchMoreData = async () => {
        try {
            if (user && user.length > 0) {
                if (user[0].phonenumber) {
                    await handleloadmoredataprivate()
                    setskip((prev) => prev + 6);
                } else {
                    await handleloadmoredata()
                    setskip((prev) => prev + 6);
                }
            }
        } catch (error) {
            console.error('Error fetching more data:', error);
        }
    };

    const handleloadmoredataprivate = async () => {
        if (user && user.length > 0) {
            let data = {
                phonesender: dataredux.phonenumber,
                phonereceiver: user[0].phonenumber,
                skip: skip
            }
            let res = await getAllChatPrivate(data)
            if (res) {
                if (res.EC === 0) {
                    if (listchat && listchat.length > 0) {
                        setlistchat((prev) => [...prev, ...res.DT.reverse()])

                    } else {
                        setlistchat(res.DT)
                    }
                    if (res.DT.length === 0) {
                        setHasMore(false);
                    }
                }
            }
        }
    }

    const handleloadmoredata = async () => {
        if (user && user.length > 0) {
            let res = await getAllGroupMessangebyGroupId({ id: user[0]._id, skip: skip })
            if (res) {
                if (res.EC === 0) {
                    if (listchat && listchat.length > 0) {
                        setlistchat((prev) => [...prev, ...res.DT.reverse()])

                    } else {
                        setlistchat(res.DT)
                    }
                    if (res.DT.length === 0) {
                        setHasMore(false);
                    }
                }
            }
        }
    }


    return (

        <Box className="chat-infor-center"
            sx={{
                height: "100%",
            }}
        >
            <Box
                id="scrollableDiv"
                sx={{
                    overflowY: 'auto',
                    height: "100%",
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    borderWidth: 1
                }}
            >
                <InfiniteScroll
                    dataLength={listchat.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    inverse={true}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {
                        listchat && listchat.length > 0
                        && listchat.map((item, index) => {
                            if (item && item.sender && item.receiver) {
                                return (
                                    <Box key={`chat-private-${index}`}>
                                        {
                                            item.sender === dataredux._id ?
                                                <Box key={`chat-private-sender-${index}`}>
                                                    <Mymessenge
                                                        item={item}
                                                    />
                                                </Box>
                                                :
                                                <Box key={`chat-private-receiver-${index}`}>
                                                    <Messenge
                                                        item={item}
                                                        user={user}
                                                    />
                                                </Box>

                                        }
                                    </Box>
                                )
                            } else {
                                return (
                                    <Box key={`chat-private-${index}`}>
                                        {
                                            item.sender && item.sender._id === dataredux._id ?
                                                <Box key={`chat-private-sender-${index}`}>
                                                    <Mymessenge
                                                        item={item}
                                                    />
                                                </Box>
                                                :
                                                <Box key={`chat-private-receiver-${index}`}>
                                                    <Messenge
                                                        item={item}
                                                        user={user}
                                                    />
                                                </Box>

                                        }
                                    </Box>
                                )
                            }
                        })
                    }
                </InfiniteScroll>
            </Box>
        </Box>
    );
};

export default ChatInforCenter;