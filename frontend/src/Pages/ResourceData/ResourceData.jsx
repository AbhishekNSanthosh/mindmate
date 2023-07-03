import './ResourceData.css'

import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';

function ResourceData() {
    const location = useLocation();
    const { state } = location;

    console.log(state)
    const navigate = useNavigate()

    useEffect(() => {
        if (state === null) {
            navigate('/resources')
        }
    }, [])
    const token = localStorage.getItem('accesToken')

    return (
        <div className='reasource_data_container'>
            <div className="nav_wrap">
                <Navbar />
            </div>
            <div className="resources_data">
                <div className="resources_row_top">
                    <span className='data_title'>{state?.resourceTitle}</span>
                </div>
                <div className="resources_row_bottom">
                    <span className='data_title top_padding'>Symptoms: {state?.symptoms}</span>
                    <hr className='divide' />
                    <span className='data_title'>When to see a doctor: {state?.seeDoctor}</span>
                    <hr className='divide' />
                    <span className='data_title'>Treatment: {state?.treatMent}</span>
                </div>
            </div>
        </div>
    )
}

export default ResourceData