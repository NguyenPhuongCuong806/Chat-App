import { Box, Paper } from '@mui/material';
import React from 'react';
import './Mymessenge.scss'

const Mymessenge = (props) => {

    const { item } = props;



    return (
        <Box className="my-messenge-container">
            <Box className="info-messenge">
                <Paper className='form-text'>
                    <span className='text'>
                        {item && item.content}
                    </span>
                </Paper>
            </Box>
        </Box>
    );
};

export default Mymessenge;