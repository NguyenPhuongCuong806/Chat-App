import React from 'react';
import ChildInfo from './ChildInfo';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Box } from '@mui/material';

const ListInfo = (props) => {

    const { open, setOpenModelsearch } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    return (
        <div>
            {
                dataredux && !_.isEmpty(dataredux)
                && dataredux.listaddfriend && dataredux.listaddfriend.length > 0
                && dataredux.listaddfriend.map((item, index) => {
                    return (
                        <Box key={`child-info-${index}`}>
                            <ChildInfo
                                item={item}
                                openSearch={open}
                                setOpenModelsearch={setOpenModelsearch}
                            />
                        </Box>

                    )
                })
            }
        </div>
    );
};

export default ListInfo;