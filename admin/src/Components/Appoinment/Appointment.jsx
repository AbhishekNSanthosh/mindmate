import React from 'react'
import './Appoinment.css'

function Appointment({
    appoinment, index
}) {
    const dateString = appoinment?.date;
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString(); // Format the date as desired


    console.log(appoinment)
    return (
        <div className='appoinment'>
            <div className="appintment_item">
                <span className="name">{appoinment?.createdBy?.username ? appoinment?.createdBy?.username : appoinment?.username}</span>
            </div>
            <div className="appintment_item">
                <span className="name_time">{formattedDate}</span>
                <span className="name_time">{appoinment?.time}</span>
            </div>
        </div>
    )
}

export default Appointment