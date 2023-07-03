import React, { useState } from 'react';
import './Dashboard.css';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useEffect } from 'react';
import Appointment from '../../Components/Appoinment/Appointment';
import { useNavigate } from 'react-router-dom';
import BookAdmin from '../../Components/BookAdmin/BookAdmin';

function Dashboard() {
    const url = 'https://dev-mindmate.onrender.com/api/v1/users'
    const token = localStorage.getItem('adminAccessToken')
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([])
    const getAllUsers = () => {
        axios.get(url + '/getAllUsers', {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            console.log(res?.data?.data);
            setUsers(res?.data?.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getAllAppointments = () => {
        axios.get(url + '/appointments/upcoming', {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            console.log(res?.data?.appointments);
            setAppointments(res?.data?.appointments)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (token) {
            getAllUsers();
            getAllAppointments();
        } else {
            navigate('/Admin-login')
        }
    }, [])

    console.log(appointments)
    return (
        <div className='dashboard'>
            <div className="navbar_wrap">
                <Navbar />
            </div>
            <div className="dasboard_container">
                <div className="dasboar_item_row">
                    <span className="username">Hi, Admin</span>
                    <span class="material-symbols-outlined logout" onClick={() => {
                        localStorage.clear()
                        toast.success("Logout successfull");
                        setTimeout(() => {
                            window.location.reload();
                        }, 300);
                    }}>
                        logout
                    </span>
                </div>
                <div className="dasboar_item_row_bottom">
                    <div className="dashboard_left">
                        <BookAdmin users={users}/>
                    </div>
                    <div className="dashboard_right">
                        <div className="right_item">
                            <span className="userlist">Upcomming Appoinment</span>
                        </div>
                        <div className="dasboard_right_col">
                            {appointments && appointments.map((appoinment, index) => (
                                <div className="right_item" key={index} >
                                    <Appointment appoinment={appoinment} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <Toaster />
        </div>
    )
}

export default Dashboard