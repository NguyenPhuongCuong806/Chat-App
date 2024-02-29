import React, { useEffect, useState } from 'react';
import ChildChat from './ChildChat';
import { Box } from '@mui/material';
import './ListChat.scss'



const ListChat = (props) => {
    const { listchatall, userfriend, handleupdateData } = props;

    return (
        <>
            {
                userfriend
                && userfriend.length > 0 &&
                userfriend.map((item, index) => {
                    return (
                        <Box key={`child-chat-id-${index}`}
                            onClick={() => props.handleClick(item)}
                        >
                            <ChildChat
                                user={item}
                                listchat={props.listchat}
                                listchatall={props.listchatall}
                                handleupdateData={handleupdateData}
                                getAllChatInfo={props.getAllChatInfo}
                            />
                        </Box>
                    )
                })
            }

        </>
    );
};

export default ListChat;