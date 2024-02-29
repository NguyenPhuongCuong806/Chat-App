import React, { useEffect, useRef, useState } from 'react';
import "./Home.scss"
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import Action from '../acction/Action';
import ListFriend from '../listchat/ListFriend';
import ChatInfo from '../chatinfo/ChatInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fechUserToken } from '../../../redux/UserSlice';
import _ from 'lodash';
import Backgroud from './Backgroud';
import { getAllChat, getAllChatPrivate, getAllChatingroup, getAllGroupMessangebyGroupId } from '../../../services/chatService';
import { getAlluserByChat } from '../../../services/userService';
import {
    handleCusttomClient, handlerefreshAccount, handlerefreshMessange, handleoffrefreshAccount, handleroffefreshMessange,
    handledisconnect, handleAcctiveDisconnect, handleactionaddgroup, handlerefreshMessangeingroup, handleuserjoingroup, handleuserleavegroup
} from '../../../socket/socket'
import { getAllGroup, getMessangefinalofgroup } from '../../../services/groupService';


const Home = () => {

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)
    const [showchat, setshowchat] = useState(false)
    const [listchat, setlistchat] = useState([])
    const [listchatfriend, setlistchatfriend] = useState([])
    const [listchatall, setlistchatall] = useState([])
    const [listgroup, setlistgroup] = useState([]);
    const [listfinalmessangegroup, setlistfinalmessangegroup] = useState([]);
    const [getallchatgroup, setgetallchatgroup] = useState([]);
    const [skip, setskip] = useState(6)
    const [hasMore, setHasMore] = useState(true);
    const [currentMessange, setcurrentMessange] = useState("");
    const [currentgroup, setcurrentgroup] = useState({});

    const theme = useTheme();
    const mdup = useMediaQuery(theme.breakpoints.up('md'))

    const [userfriend, setuserfriend] = useState([])

    useEffect(() => {
        getAllChatbyuser()
        getAllChatInfo()
        getAllGroups()
        getfinalmessangeofgroup()
        getAllchatgroup()
    }, [])

    useEffect(() => {
        handleCustomData()
    }, [listchatfriend])

    useEffect(() => {
        getAllChatInfo();
        getfinalmessangeofgroup()
    }, [listchat])

    useEffect(() => {
        handleupdateData()
    }, [listchatall])

    useEffect(() => {
        handleupdateData()
    }, [listfinalmessangegroup])

    const getAllChatbyuser = async () => {
        if (dataredux) {
            let res = await getAlluserByChat({ id: dataredux._id });
            if (res && res.EC === 0) {
                setlistchatfriend(res.DT)
            }

        }

    }

    const getAllchatgroup = async () => {
        let res = await getAllChatingroup();
        if (res && res.EC === 0) {
            setgetallchatgroup(res.DT)
        }
    }

    const getfinalmessangeofgroup = async () => {
        if (dataredux) {
            let res = await getMessangefinalofgroup({ id: dataredux._id });
            if (res && res.EC === 0) {
                setlistfinalmessangegroup(res.DT)
            }

        }
    }

    const getAllChatInfo = async () => {
        if (dataredux) {
            let res = await getAllChat({ phonesender: dataredux.phonenumber });
            if (res && res.EC === 0) {
                setlistchatall(res.DT)
            }

        }

    }

    const getAllGroups = async () => {
        if (dataredux) {
            let res = await getAllGroup({ id: dataredux._id });
            if (res) {
                if (res.EC === 0)
                    setlistgroup(res.DT)
            }

        }
    }

    const handleCustomData = () => {
        if (listchatfriend && listchatfriend.length > 0) {
            if (listchatall && listchatall.length > 0) {
                let data = listchatfriend.map((item, index) => {
                    let datas = listchatall.filter((items) => items.receiver === item._id || items.sender === item._id)
                    if (datas && !_.isEmpty(datas)) {
                        let final = { ...datas.slice(0)[0] };
                        return {
                            ...item, click: false,
                            contentfinal: final.content,
                            sender: final.sender
                        };
                    } else {
                        let datas = listfinalmessangegroup.filter((items) => items.group === item._id)
                        if (datas && datas.length > 0) {
                            return {
                                ...item, click: false,
                                contentfinal: datas[0].content,
                                sender: datas[0].sender
                            }
                        } else {
                            return {
                                ...item, click: false,
                                contentfinal: "",
                                sender: ""
                            }
                        }

                    }

                })
                setuserfriend(data)
            } else {
                let data = listchatfriend.map((item, index) => {
                    return {
                        ...item, click: false
                    }
                })
                setuserfriend(data)
            }
        }
    }

    const handleClick = async (item) => {
        let cpdata = _.cloneDeep(userfriend);
        cpdata.forEach((item) => {
            item.click = false;
        })
        let objIndex = cpdata.findIndex((items) => items._id === item._id);
        if (objIndex !== -1) {
            cpdata[objIndex].click = true;
            if (dataredux) {
                if (cpdata[objIndex].phonenumber) {
                    setcurrentMessange("private")
                    let data = {
                        phonesender: dataredux.phonenumber,
                        phonereceiver: cpdata[objIndex].phonenumber,
                        skip: 0
                    }
                    let res = await getAllChatPrivate(data)
                    if (res) {
                        if (res.EC === 0) {
                            setskip(6)
                            setlistchat(res.DT.reverse())
                            setHasMore(true)
                        }
                    }
                } else {
                    if (!currentgroup) {
                        setcurrentMessange("group")
                        setcurrentgroup(item)
                    } else {
                        if (item._id !== currentgroup.groupId) {
                            let data = { groupId: currentgroup._id, user: dataredux.phonenumber, namegroup: currentgroup.name };
                            await handleuserleavegroup(data)
                            setcurrentgroup(item)
                        }
                    }
                    let res = await getAllGroupMessangebyGroupId({ id: item._id, skip: 0 });
                    if (res) {
                        if (res.EC === 0) {
                            if (res.DT && res.DT.length > 0) {
                                setHasMore(true)
                            } else {
                                setHasMore(false)
                            }
                            setskip(6)
                            setlistchat(res.DT.reverse())
                        }
                    } else {
                        setlistchat([])
                    }
                }
            }

        }
        setuserfriend(cpdata)
        if (!mdup) {
            setshowchat(true)
        }

    }


    const handleupdateData = () => {
        if (userfriend && userfriend.length > 0) {
            if (listchatall && listchatall.length > 0) {
                let data = userfriend.map((item, index) => {
                    let datas = listchatall.filter((items) => items.receiver === item._id || items.sender === item._id)
                    if (datas && !_.isEmpty(datas)) {
                        let final = { ...datas.slice(0)[0] };
                        return {
                            ...item,
                            contentfinal: final.content,
                            sender: final.sender
                        };
                    } else {
                        let datas = listfinalmessangegroup.filter((items) => items.group === item._id)
                        if (datas && datas.length > 0) {
                            return {
                                ...item,
                                contentfinal: datas[0].content,
                                sender: datas[0].sender
                            }
                        } else {
                            return {
                                ...item,
                                contentfinal: "",
                                sender: ""
                            }
                        }

                    }

                })
                setuserfriend(data)
            }

        }
    }

    useEffect(() => {
        if (mdup) {
            setshowchat(false)
        }
    }, [mdup])


    useEffect(() => {
        handleCusttomClient({ customId: dataredux.phonenumber })

        handlerefreshAccount(() => {
            dispatch(fechUserToken())
        })
    }, []);


    useEffect(() => {
        handlerefreshAccount(() => {
            getAllChatbyuser()
        })
        handleCusttomClient({ customId: dataredux.phonenumber })

    }, [dataredux])

    useEffect(() => {
        getAllChatbyuser()
    }, [dataredux])

    useEffect(() => {
        handleactionaddgroup(() => {
            getAllChatbyuser()
        })
    }, [listgroup])

    useEffect(() => {
        if (currentMessange === "private") {
            handleuserleavegroup({ groupId: currentgroup._id, user: dataredux.phonenumber, namegroup: currentgroup.name })
        }
    }, [currentMessange])

    useEffect(() => {
        if (currentgroup) {
            handleuserjoingroup({ groupId: currentgroup._id, user: dataredux.phonenumber, namegroup: currentgroup.name })
        }
    }, [currentgroup])


    return (
        <Grid container spacing={0}>
            <Grid item xs={2} sm={1.3} md={0.8}>
                <Action
                    setshowchat={setshowchat}
                />
            </Grid>
            <Grid item xs={10} sm={10.7} md={3} display={showchat ? "none" : { md: "block" }}>
                <ListFriend
                    handleClick={handleClick}
                    userfriend={userfriend}
                    listchat={listchat}
                    listchatall={listchatall}
                    handleupdateData={handleupdateData}
                    getAllChatInfo={getAllChatInfo}
                    handleCustomData={handleCustomData}
                />
            </Grid>
            <Grid item xs={10} sm={10.7} md={8.2} display={showchat ? "block" : { sm: "none", md: "block", xs: "none" }}>
                {
                    userfriend && userfriend.length > 0
                        && (userfriend.findIndex(item => item.click === true) !== -1)
                        ?
                        <ChatInfo
                            userfriend={userfriend}
                            listchat={listchat}
                            setlistchat={setlistchat}
                            getAllChatInfo={getAllChatInfo}
                            skip={skip}
                            setskip={setskip}
                            hasMore={hasMore}
                            setHasMore={setHasMore}
                            currentgroup={currentgroup}
                        />
                        :
                        <Backgroud />
                }

            </Grid>
        </Grid>
    );
};

export default Home;