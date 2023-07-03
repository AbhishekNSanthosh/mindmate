import React, { useState } from 'react';
import './BookAdmin.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function BookAdmin() {
    const [tableData, setTableData] = useState([
        { id: 1, name: 'Aster Medicity' },
        { id: 2, name: 'Baby Memorial Hospital', },
        { id: 3, name: 'St Thomas Hospital' },
        { id: 4, name: 'Rajagiri Hospital' },
        { id: 5, name: 'Believers Hospital', },
        { id: 6, name: 'NSS Mission Hospital' },
        { id: 7, name: 'Amritha Hospital' },
        { id: 8, name: 'Matha Hospital' },
        // Add more data as needed
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = tableData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );



    const [hospitals, setHospitals] = useState([
        { id: 1, name: 'Hospital A' },
        { id: 2, name: 'Hospital B' },
        { id: 3, name: 'Hospital C' },
        // Add more hospitals as needed
    ]);

    const [selectedHospital, setSelectedHospital] = useState('');
    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedTime, setSelectedTime] = useState(0);

    const handleHospitalChange = (e) => {
        setSelectedHospital(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform submission logic here
        console.log('Hospital:', selectedHospital);
        console.log('Date:', selectedDate);
        console.log('Time:', selectedTime);

        // Reset form fields
        setSelectedHospital('');
        setSelectedDate('');
        setSelectedTime('');
    };
    const url = 'https://dev-mindmate.onrender.com/api/v1/users'
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])

    const handleAppointment = (e) => {
        e.preventDefault();
        axios.post(url + '/bookAppointment', {
            date: selectedDate,
            time: selectedTime,
            hospitalname: selectedHospital
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            console.log(res);
            toast.success(res?.data?.message);
            setSelectedDate(0);
            setSelectedHospital("");
            setSelectedTime(0)
            setTimeout(() => {
                navigate('/progress')
            }, 300);
        }).catch((err) => {
            console.log(err);
            toast.error(err?.response.data?.message);
            setSelectedTime(0);
            setSelectedDate(0);
        })
    }
    return (
        <div className="book_wrapper">
            <form onSubmit={handleAppointment}>
                <div className="book_row_title">
                    <span className="book_title">
                        Book Appointments
                    </span>
                </div>
                <div className="book_row">
                    <input
                        className='search-input'
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by Hospital name..."
                    />
                    <select id="mySelector"                         className='search-input'>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>

                </div>
                <div className="book_row">
                    <div className="book_row_col_left">
                        {filteredData.map((item) => (
                            <>
                                <div className="book_name">
                                    <label key={item.id}>
                                        <input
                                            className='input_radio'
                                            type="radio"
                                            value={item.name}
                                            checked={selectedHospital === item.name}
                                            onChange={handleHospitalChange}
                                        />
                                        {item.name}
                                    </label>
                                </div>
                                <hr className='hr_book' />
                            </>
                        ))}
                    </div>
                    <div className="book_row_col_right">
                        <div className='book_right_item'>
                            <label>
                                Date:
                                <input
                                    className='time'
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </label>
                        </div>
                        <div className='book_right_item'>
                            <label>
                                Time:
                                <input
                                    className='time'
                                    type="time"
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                />
                            </label>
                        </div>
                        <div className='book_right_item'>
                            <button className='book_submit' type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BookAdmin