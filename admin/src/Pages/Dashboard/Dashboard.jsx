import React from 'react';
import './Dashboard.css';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';

function Dashboard() {
    const url = 'https://dev-mindmate.onrender.com/api/v1/users'
    const token = localStorage.getItem('adminAccessToken')

    const getAllUsers = () => {
        axios.get(url+'getAllUsers',)
    }
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
                    <div className="dashboard_left">h</div>
                    <div className="dashboard_right">
                        <div className="right_item">
                            <span className="userlist">All users</span>
                        </div>
                    </div>
                </div>

            </div>
            <Toaster />
        </div>
    )
}

export default Dashboard