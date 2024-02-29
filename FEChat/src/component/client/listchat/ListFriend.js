import React, { useEffect, useState } from 'react';
import './ListFriend.scss'
import { Box } from '@mui/material';
import Search from './search/Search';
import { Scrollbars } from 'react-custom-scrollbars-2';
import SearchModule from './module/SearchModule';
import ListChat from './ChildChat/ListChat';
import ListInfo from './listinfo/ListInfo';



const ListFriend = (props) => {

    const [open, setOpen] = useState(false);
    const [textsearch, settextsearch] = useState("");

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpen = () => {
        settextsearch("")
        setOpen(true);
        props.handleCustomData()
    };
    const handleClose = () => {
        settextsearch("")
        setOpen(false);
        props.handleCustomData()
    };

    return (
        <Box className="list-friend-container">
            <Box className="list-friend-top">
                <Search
                    handleOpen={handleOpen}
                    open={open}
                    handleClose={handleClose}
                    textsearch={textsearch}
                    settextsearch={settextsearch}
                    value={value}
                    handleChange={handleChange}
                />
            </Box>
            <Box className="list-friend-bottom">
                <Scrollbars>
                    {
                        !open
                            ?
                            <>
                                {
                                    value && value === "1"
                                        ?
                                        <>
                                            <ListChat
                                                handleClick={props.handleClick}
                                                userfriend={props.userfriend}
                                                listchat={props.listchat}
                                                listchatall={props.listchatall}
                                                handleupdateData={props.handleupdateData}
                                                getAllChatInfo={props.getAllChatInfo}
                                            />

                                        </>
                                        :
                                        value === "4"
                                            ?
                                            <>
                                                <ListInfo
                                                    open={open}
                                                    handleCloseSearch={handleClose}
                                                />
                                            </>
                                            :
                                            <></>
                                }
                            </>
                            :
                            <>
                                <SearchModule
                                    handleClose={handleClose}
                                    open={open}
                                    textsearch={textsearch}
                                />

                            </>
                    }
                </Scrollbars>

            </Box>

        </Box >
    );
};

export default ListFriend;