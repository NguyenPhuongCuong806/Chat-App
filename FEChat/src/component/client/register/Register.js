import {
    Box, Button, Container, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel
    , useMediaQuery, useTheme
} from '@mui/material';
import React, { useState } from 'react';
import logochat from "../assest/img/zlogo.png"
import { Visibility, VisibilityOff, AppRegistrationRounded, LoginOutlined } from '@mui/icons-material';
import "./Register.scss"
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { RegisterUser } from '../../../services/userService';

const Register = () => {

    const theme = useTheme();

    const defaultData = {
        firstname: "",
        lastname: "",
        phonenumber: "",
        password: "",
        confirmpassword: ""
    }

    const defaultValid = {
        phonenumber: true,
        lastname: true,
        firstname: true,
        password: true,
        confirmpassword: true
    }

    const [userValid, setuserValid] = useState(defaultValid);

    const [userData, setuserData] = useState(defaultData);

    const navigate = useNavigate();

    const tablet = useMediaQuery(theme.breakpoints.down('md'))

    const [showPassword, setshowPassword] = useState(false)

    const [showPasswordCF, setshowPasswordCF] = useState(false)

    const handleformLogin = () => {
        navigate("/login")
    }

    const handleChangeInput = (value, id) => {
        let cpuserData = _.cloneDeep(userData);
        cpuserData[id] = value;
        setuserData(cpuserData);
    }

    const handleRegister = async () => {
        let res = await RegisterUser(userData);
        let check = validData();
        if (check === true) {
            if (res && res.EC === 0) {
                setuserData(defaultData);
                toast.success(res.EM)
            } else {
                toast.error(res.EM)
            }
        }
    }

    const validData = () => {
        setuserValid(defaultValid)
        if (!userData.phonenumber) {
            setuserValid({ ...userValid, phonenumber: false })
            return false;
        }
        if (!userData.firstname) {
            setuserValid({ ...userValid, firstname: false })
            return false;
        }
        if (!userData.lastname) {
            setuserValid({ ...userValid, lastname: false })
            return false;
        }
        if (!userData.password) {
            setuserValid({ ...userValid, password: false })
            return false;
        }
        if (!userData.confirmpassword) {
            setuserValid({ ...userValid, confirmpassword: false })
            return false;
        }
        if (userData.password !== userData.confirmpassword) {
            setuserValid({ ...userValid, confirmpassword: false })
            return false;
        }
        return true;
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
                        <FormControl
                            error={!userValid.phonenumber}
                            variant="standard"
                            fullWidth
                        >
                            <InputLabel htmlFor="standard-adornment-password">Phone Number</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={'text'}
                                fullWidth
                                value={userData.phonenumber}
                                onChange={(e) => handleChangeInput(e.target.value, "phonenumber")}
                            />
                            {
                                !userValid.phonenumber &&
                                <FormHelperText
                                    id="component-error-text"
                                >Phone number is not empty</FormHelperText>
                            }
                        </FormControl>
                    </Box>
                    <Box sx={{
                        marginTop: 1
                    }}>
                        <FormControl variant='standard'
                            error={!userValid.firstname}
                            fullWidth>
                            <InputLabel htmlFor="standard-adornment-password">First name</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={'text'}
                                fullWidth
                                value={userData.firstname}
                                onChange={(e) => handleChangeInput(e.target.value, "firstname")}
                            />
                            {
                                !userValid.firstname &&
                                <FormHelperText
                                    id="component-error-text"
                                >firstname is not empty</FormHelperText>
                            }
                        </FormControl>
                    </Box>
                    <Box sx={{
                        marginTop: 1
                    }}>
                        <FormControl variant='standard'
                            error={!userValid.lastname}
                            fullWidth>
                            <InputLabel htmlFor="standard-adornment-password">Last name</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={'text'}
                                fullWidth
                                value={userData.lastname}
                                onChange={(e) => handleChangeInput(e.target.value, "lastname")}
                            />
                            {
                                !userValid.lastname &&
                                <FormHelperText
                                    id="component-error-text"
                                >lastname is not empty</FormHelperText>
                            }
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            marginTop: 1
                        }}
                    >
                        <FormControl variant='standard'
                            fullWidth
                            error={!userValid.password}
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
                                value={userData.password}
                                onChange={(e) => handleChangeInput(e.target.value, "password")}
                            />
                            {
                                !userValid.password &&
                                <FormHelperText
                                    id="component-error-text"
                                >password is not empty</FormHelperText>
                            }
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            marginTop: 1
                        }}
                    >
                        <FormControl
                            variant='standard'
                            fullWidth
                            error={!userValid.confirmpassword}
                        >
                            <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPasswordCF ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setshowPasswordCF(!showPasswordCF)}
                                        >
                                            {showPasswordCF ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                fullWidth
                                value={userData.confirmpassword}
                                onChange={(e) => handleChangeInput(e.target.value, "confirmpassword")}
                            />
                            {
                                !userValid.confirmpassword &&
                                <FormHelperText
                                    id="component-error-text"
                                >confirmpassword is not empty or not exactly</FormHelperText>
                            }
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            marginTop: 2
                        }}
                    >
                        <Button variant="contained" color='success' startIcon={<AppRegistrationRounded />}
                            fullWidth
                            onClick={() => handleRegister()}
                        >
                            Register
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            marginTop: 2
                        }}
                    >
                        <Button variant="outlined" startIcon={<LoginOutlined />} fullWidth
                            onClick={() => handleformLogin()}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Register;