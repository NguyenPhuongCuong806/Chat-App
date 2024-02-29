
import React, { useEffect, useState } from 'react';
import "./Search.scss"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Box, Tab, Tabs } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomTab from './CustomTab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import ModuleGroup from '../../module/moduleaddgroup/ModuleGroup';


const Search = (props) => {

    const [openGroup, setopenGroup] = useState(false)

    const handleopenGroup = () => {
        setopenGroup(true)
    }

    const handleopenClose = () => {
        setopenGroup(false)
    }

    const handleclose = () => {
        props.handleClose();
    }

    return (
        <Paper className="search-container">
            <Box className="search-top">
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onClick={() => props.handleOpen()}
                    onChange={(e) => props.settextsearch(e.target.value)}
                    value={props.textsearch}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                {
                    !props.open ?
                        <>
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                <PersonAddAltIcon />
                            </IconButton>
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
                                onClick={() => handleopenGroup()}
                            >
                                <GroupAddIcon />
                            </IconButton>
                        </>

                        :
                        <>
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
                                onClick={() => handleclose()}
                            >
                                <CancelIcon />
                            </IconButton>
                        </>
                }

            </Box>
            <Box className="search-bottom" display={!props.open ? "flex" : "none"}>
                <Box>
                    <TabContext value={props.value}>
                        <TabList className='tabs-parent'
                            onChange={props.handleChange}
                            aria-label="lab API tabs example"
                            variant="scrollable"
                        >
                            <Tab className='tab-child' label="Tất cả" value="1" />
                            <Tab className='tab-child' label="Chưa đọc" value="2" />
                            <Tab className='tab-child' label="Phân loại" value="3" />
                            <Tab className='tab-child' icon={<CustomTab
                                value={props.value} />} value="4" />
                        </TabList>

                    </TabContext>
                </Box>

            </Box>
            <ModuleGroup
                open={openGroup}
                handleClose={handleopenClose}
            />
        </Paper>
    );
};

export default Search;