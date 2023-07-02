import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import './SigninModal.css'
import Typography from '@mui/material/Typography';
import { Divider, TextField } from '@mui/material';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function SigninModal({getcall, modal, handleClose }) {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("");
    const url = 'https://dev-mindmate.onrender.com/api/v1/users'
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            handleClose()
        }
    }, [])


    const handleSignup = () => {
        axios.post(url + '/signup', {
            username, email, password
        }).then((res) => {
            console.log(res.data)
            if (res?.data?.statusCode === 201) {
                toast.success(res?.data?.message);
            } else {
                toast.error('Something went wrong!')
            }
        }).catch((err) => {
            toast.error('Something went wrong!')
            console.log(err)
        })
    }

    const handleLogin = () => {
        axios.post(url + '/login', {
            username, password
        }).then((res) => {
            console.log(res.data);
            getcall(true)
            localStorage.setItem('accessToken', res?.data?.accessToken)
            localStorage.setItem('user', JSON.stringify(res?.data?.data))
            toast.success(res?.data?.message);
            handleClose()
            setTimeout(() => {
                navigate('/')
            }, 900);
        }).catch((err) => {
            toast.error('Something went wrong!')
            console.log(err)
        })
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modal}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '60%',
                        bgcolor: '#fff',
                        border: '1px solid #fff',
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <div className="signin_container">
                            <div className="signin_row top">
                                <span className="mindmate">MindMate</span>
                            </div>
                            <div className="signin_row">
                                <div className="signin_row_col">
                                    <span className="signin">Signup</span>
                                    <TextField onChange={(e) => { setUsername(e.target.value) }} variant='outlined' label="Username" />
                                    <TextField onChange={(e) => { setEmail(e.target.value) }} variant='outlined' label="Email" />
                                    <TextField onChange={(e) => { setPassword(e.target.value) }} variant='outlined' label="Password" />
                                    <button onClick={handleSignup} className="sigin_button">Sign up</button>
                                </div>
                                <div className="signin_row_col">
                                    <span className="signin">Signin</span>
                                    <TextField onChange={(e) => { setUsername(e.target.value) }} variant='outlined' label="Username" />
                                    <TextField onChange={(e) => { setPassword(e.target.value) }} variant='outlined' label="Password" />
                                    <button onClick={handleLogin} className="sigin_button">Sign in</button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
            <Toaster />
        </div>
    );
}