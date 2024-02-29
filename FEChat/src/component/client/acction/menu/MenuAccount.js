import React from 'react';
import './MenuAccount.scss'
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Avatar, Menu } from '@mui/material';
import { handleAcctiveDisconnect, handledisconnect } from '../../../../socket/socket';
import { logoutuser } from '../../../../services/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fechUserToken } from '../../../../redux/UserSlice';

const MenuAccount = (props) => {

    const { handleClose, open, anchorEl } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const handlelogout = async () => {
        let res = await logoutuser();
        if (res) {
            if (res.EC === 0) {
                dispatch(fechUserToken())
                navigate("/login")
                handleClose();
                handledisconnect({ customId: dataredux.phonenumber })
            }
        }
    }

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={() => handlelogout()}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
};

export default MenuAccount;