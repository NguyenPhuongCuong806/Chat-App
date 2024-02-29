import React, { useEffect, useState } from 'react';
import './SearchModule.scss'
import { Box, Button, Modal } from '@mui/material';
import ChildFriend from '../childfriend/ChildFriend';
import { getAllUser } from '../../../../services/userService';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const SearchModule = (props) => {

    const [listuser, setlistuser] = useState([]);
    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)
    const [usersearch, setusersearch] = useState({})

    const getAlluser = async () => {
        let res = await getAllUser();
        if (res) {
            if (res.EC === 0) {
                setlistuser(res.DT)
            }
        }
    }

    useEffect(() => {
        getAlluser()
    }, [])

    const handleSearch = () => {
        let cplistuser = _.cloneDeep(listuser);
        let index = cplistuser.findIndex((item) => item.phonenumber === props.textsearch)
        if (index !== -1) {
            setusersearch(cplistuser[index])
        } else {
            setusersearch({})
        }
    }

    useEffect(() => {
        handleSearch()
    }, [props.textsearch])


    return (
        <Box className="search-form-container">
            {
                usersearch && !_.isEmpty(usersearch) ?
                    <>
                        <ChildFriend
                            item={usersearch}
                            textsearch={props.textsearch}
                            handleCloses={props.handleClose}
                        />
                    </>
                    :
                    <>
                        {
                            dataredux && dataredux.listfriend &&
                            dataredux.listfriend.map((item, index) => {
                                return (
                                    <ChildFriend key={`friend-${index}`}
                                        item={item}
                                        textsearch={props.textsearch}
                                        handleCloses={props.handleClose}

                                    />
                                )
                            })
                        }
                    </>
            }
        </Box>
    )
};

export default SearchModule;