import {
    Box, Button, Container, IconButton, Input, InputAdornment, InputLabel
    , useMediaQuery, useTheme
} from '@mui/material';
import React, { useState } from 'react';
import logochat from "../assest/img/zlogo.png"
import { Visibility, VisibilityOff, Delete, LoginOutlined, AppRegistrationRounded } from '@mui/icons-material';
import "./Login.scss"
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/userService';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fechUserToken } from '../../../redux/UserSlice';
import { handleCusttomClient } from '../../../socket/socket';


const Login = () => {

    const theme = useTheme();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const tablet = useMediaQuery(theme.breakpoints.down('md'))

    const [showPassword, setshowPassword] = useState(false)

    const handleformRegister = () => {
        navigate("/register")
    }

    const defaultData = {
        phonenumber: "",
        password: ""
    }

    const [user, setuser] = useState(defaultData)

    const handleOnChange = (value, id) => {
        let cpuser = _.cloneDeep(user);
        cpuser[id] = value;
        setuser(cpuser)
    }

    const handleLogin = async () => {
        let res = await loginUser(user)
        if (res) {
            if (res.EC === 0) {
                await dispatch(fechUserToken())
                handleCusttomClient({ customId: res.DT.phonenumber })
                // handlerefreshAccount(() => {
                //     dispatch(fechUserToken())
                // })
                navigate("/")
            } else {
                toast.error(res.EM)
            }
        }
    }



    return (
        <Box
            sx={{
                bgcolor: "#aad6ff",
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 5
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: `url(${logochat})`,
                            width: 114,
                            height: 40,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    >
                    </Box>
                    <Box sx={{
                        textAlign: "center",
                        marginTop: 1
                    }}>
                        <h2 style={{
                            fontSize: "1.1em",
                            color: "#333",
                            fontWeight: "400"
                        }}>
                            Xác minh tài khoản Zalo
                            <br />
                            để kết nối với ứng dụng Zalo Web
                        </h2>
                    </Box>
                </Box>
                <Box
                    sx={{
                        marginTop: 1
                    }}
                    bgcolor={"#ffffff"}
                    width={tablet ? "80%" : "400px"}
                    padding={2}
                >
                    <Box sx={{
                        marginTop: 1
                    }}>
                        <InputLabel htmlFor="standard-adornment-password">Phone number</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={'text'}
                            fullWidth
                            value={user.phonenumber}
                            onChange={(e) => handleOnChange(e.target.value, "phonenumber")}
                        />
                    </Box>
                    <Box
                        sx={{
                            marginTop: 1
                        }}
                    >
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setshowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            fullWidth
                            value={user.password}
                            onChange={(e) => handleOnChange(e.target.value, "password")}
                        />
                    </Box>
                    <Box
                        sx={{
                            marginTop: 2
                        }}
                    >
                        <Button variant="contained" startIcon={<LoginOutlined />} fullWidth
                            onClick={() => handleLogin()}
                        >
                            Login
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            marginTop: 2
                        }}
                    >
                        <Button variant="outlined" startIcon={<AppRegistrationRounded />} fullWidth
                            onClick={() => handleformRegister()}
                        >
                            Register
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            marginTop: 2,
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <h4 className='forgot-pass'>
                            Forgot password?
                        </h4>

                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;