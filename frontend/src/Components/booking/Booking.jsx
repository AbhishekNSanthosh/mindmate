import React from 'react'

const Booking = ({ booking ,index}) => {
    
    const dateString = booking?.date;
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString(); // Format the date as desired
  

    return (
        <div className="progress_report_row">
            <div className="booking_row">
                <span className="index">
                    {index + 1}.
                </span>
                <span className="progressess">
                    {booking?.hospitalname}
                </span>
            </div>
            <div className="booking_row">
                <span className="progressess_time">
                    {formattedDate}
                </span>
                <span className="progressess_time">
                    {booking?.time}
                </span>
            </div>
        </div>
    )
}

export default Booking