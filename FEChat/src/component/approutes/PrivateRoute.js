import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { fechUserToken } from '../../redux/UserSlice';
import Loading from '../load/Loading';

const PrivateRoute = (props) => {

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess)

    useEffect(() => {
        if (window.location.pathname !== '/login' || window.location.pathname !== '/register')
            dispatch(fechUserToken())
    }, [])


    if (dataredux.isLoading === true) {
        return (
            <Loading />
        )
    } else {
        if (dataredux && dataredux.isAuthenticated === true) {
            return (
                <Routes>
                    <Route path="/" element={props.component} />
                </Routes>
            );
        }
        else {
            return <Navigate to="/login" replace />
        }
    }
};

export default PrivateRoute;