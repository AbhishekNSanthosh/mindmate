import React from 'react'
import './FeaturesRow.css'

const FeaturesRow = () => {
    return (
        <div className='features'>
            <div className="feature-row">
                <div className="feature-title-box">
                    <span className="feature-title">Our Features</span>
                </div>
                <div className="feature-item-row">
                    <div className="feature-item">
                        <div className="feature-item-box">
                            <span className="feature">Mind Assessment</span>
                        </div>
                        <div className="feature-item-box">
                            <span className="feature-desc">Discover insights into your mental state through a comprehensive assessment.</span>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-item-box">
                            <span className="feature">Knowledge Hub</span>
                        </div>
                        <div className="feature-item-box">
                            <span className="feature-desc">Explore a vast collection of mental health resources for guidance and support.</span>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-item-box">
                            <span className="feature">Counselling Connect</span>
                        </div>
                        <div className="feature-item-box">
                            <span className="feature-desc">Effortlessly book appointments with counseling centers or therapists near you.</span>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-item-box">
                            <span className="feature">Personal Growth Tracker</span>
                        </div>
                        <div className="feature-item-box">
                            <span className="feature-desc">Monitor your personal growth and track your progress on your mental wellness journey.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturesRow