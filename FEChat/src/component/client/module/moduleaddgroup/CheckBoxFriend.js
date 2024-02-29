import React from 'react';
import './CheckBoxFriend.scss'
import { Avatar, Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const CheckBoxFriend = (props) => {

    const handleChecked = (e) => {
        props.handleChoose({
            ...props.item, checked: e.target.checked
        })
    }


    const firstInitial = props.item.firstname ? props.item.firstname.substring(0, 1).toUpperCase() : '';
    const lastInitial = props.item.lastname ? props.item.lastname.substring(0, 1).toUpperCase() : '';
    return (
        <FormGroup className='check-box-friend-container'>
            <FormControlLabel control={
                <Checkbox
                    onChange={(e) => handleChecked(e)}
                    checked={props.item.checked}
                />
            } label={
                <Box className="check-box-friend-container-body">
                    <Box>
                        <Avatar
                            sx={{ width: 45, height: 45 }}
                        >
                            {
                                props.item ?
                                    firstInitial + lastInitial
                                    :
                                    ""
                            }
                        </Avatar>
                    </Box>
                    <Box className="child-chat-right">
                        <h4>
                            {props.item && `${props.item.firstname.toUpperCase()} ${props.item.lastname.toUpperCase()}`}
                        </h4>
                    </Box>

                </Box>
            } />
        </FormGroup>
    );
};

export default CheckBoxFriend;