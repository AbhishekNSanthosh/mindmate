import React, { useEffect, useState } from 'react'
import './Progress.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import Booking from '../../Components/booking/Booking';

function Progress() {

    const [results, setResults] = useState([]);
    const [bookings, setBookings] = useState([]);

    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])
    const url = 'https://dev-mindmate.onrender.com/api/v1/users'

    const handlegetresults = () => {
        axios.get(url + '/getPreviousResults', {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            console.log(res);
            setResults(res?.data?.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handlegetbookings = () => {
        axios.get(url + '/upcomingAppointments', {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            console.log('bookig', res.data.appointments);
            setBookings(res?.data?.appointments)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        handlegetresults();
        handlegetbookings();
    }, [])

    return (
        <div className='progress_container'>
            <div className="nav_wrapper">
                <Navbar />
            </div>
            <div className="progress_wrapper">
                <div className="progress_left">
                    <div className="progress_report">
                        <div className="progress_report_row_top">
                            <span className="title_progress">
                                Your Previous Analysis Reports
                            </span>
                        </div>
                        <div className="progress_wrap">
                            {results && results.map((result, index) => (
                                <div className="progress_report_row_left" key={index}>
                                    <span className="index">
                                        {index + 1}.
                                    </span>
                                    <span className="progressess">
                                        Stages of <span className="bold">{result?.result}</span> were found
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="progress_right">
                    <div className="progress_report">
                        <div className="progress_report_row_top">
                            <span className="title_progress">
                                Your Previous Bookings
                            </span>
                        </div>
                        <div className="progress_wrap">
                            {bookings && bookings.map((booking, index) => (
                                <Booking booking={booking} index={index}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Progress
