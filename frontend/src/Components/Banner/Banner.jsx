import React from 'react'
import './Banner.css'

const Banner = () => {
    return (
        <div className='banner'>
            <div className="banner-title-box">
                <div className="banner-box">
                    <span className="banner-title">
                        Welcome to
                    </span>
                </div>
                <div className="banner-box">
                    <span className="banner-title">
                        MindMate
                    </span>
                </div>
            </div>
            {/* <div className="banner-title-box">
            </div> */}
            <div className="banner-title-box">
                <span className="banner-title-sub">
                    Discover your path to mental well-being. Explore resources, track progress, and book appointments with ease. Empower your mind, embrace your wellness journey. Welcome to a brighter tomorrow.
                </span>
            </div>
            <div className="banner-title-box">
                <button className="banner-button">Go to features</button>
            </div>
        </div>
    )
}

export default Banner