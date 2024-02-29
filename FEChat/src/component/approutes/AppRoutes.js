import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../client/login/Login";
import Register from '../client/register/Register'
import Home from '../client/home/Home';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path='/' element={<PrivateRoute component={<Home />} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;