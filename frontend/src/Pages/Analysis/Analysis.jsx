import React from 'react'
import './Analysis.css'
import Navbar from '../../Components/Navbar/Navbar'

function Analysis() {
    return (
        <div className='analysis'>
            <Navbar />
            <hr />
            <div className="analysis-box">
                <div className="analysis-row">
                    <span class="material-symbols-outlined arrow">
                        keyboard_backspace
                    </span>
                    <span className="analysis-title t">Mental Health Analysis Test</span>
                </div>
                <div className="analysis-que-box"></div>
            </div>
        </div>
    )
}

export default Analysis