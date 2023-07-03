import React, { useState } from 'react'
import './AdminLogin.css';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const url = 'https://dev-mindmate.onrender.com/api/v1/users'

    const navigate = useNavigate()

    const token = localStorage.getItem('adminAccessToken')
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [])

    const handleLogin = () => {
        axios.post(url + '/AdminLogin', {
            username, password
        }).then((res) => {
            console.log(res?.data?.accessToken);
            toast.success('Login Successful')
            navigate('/')
            localStorage.setItem('adminAccessToken', res?.data?.accessToken)
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message)
        })
    }
    return (
        <div className='admin_login'>
            <div className="admin_login_box">
                <span className="login_title">Admin Login</span>
                <input onChange={(e) => setUsername(e.target.value)} type="text" className='admin_login_input' placeholder='Username' />
                <input onChange={(e) => setPassword(e.target.value)} type="password" className='admin_login_input' placeholder='Password' />
                <button onClick={() => {
                    handleLogin();
                }} className="admin_login_button">ADMIN LOGIN</button>
            </div>
            <Toaster />
        </div>
    )
}

export default AdminLogin