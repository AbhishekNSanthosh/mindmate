import React from 'react';
import './Dashboard.css';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../Components/Navbar/Navbar';

function Dashboard() {
    return (
        <div className='dashboard'>
            <div className="navbar_wrap">
                <Navbar />
            </div>
            <div className="dasboard_container">

            </div>
            <Toaster />
        </div>
    )
}

export default Dashboard