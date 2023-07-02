import React from 'react'
import './Feature.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { NavLink } from 'react-router-dom'

function Feature() {
    return (
        <div className='feature-page'>
            <Navbar />
            <div className="feature-container">
                <div className="feature-box">
                    <div className="feature-box-row">
                        <div className="feature-item-box-row">
                            <span className="good">Good Morning User </span>
                        </div>
                        <div className="feature-item-box-row">
                            <span className="good-item">Navigate your mental wellness journey together.</span>
                        </div>
                    </div>
                    <div className="feature-box-col">
                        <div className="feature-box-left">
                            <div className="feature-item-box-row">
                                <span className="item-t">Mental Health Analysis</span>
                            </div>
                            <div className="feature-item-box-row">
                                <span className="item-d">Gain insights into your mental well-being through our comprehensive analysis. Answer a set of thought-provoking questions and receive personalized results to better understand your mental state.</span>
                            </div>
                            <div className="feature-item-box-row-arrow">
                                <NavLink to='/analysis'>
                                    <span className="material-symbols-outlined">
                                        double_arrow
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                        <div className="feature-box-right">
                            <div className="feature-item-box-row">
                                <span className="item-t">Resources and Library</span>
                            </div>
                            <div className="feature-item-box-row">
                                <span className="item-d">Explore a comprehensive collection of mental health resources at your fingertips. Discover articles, videos, guides, and more to support your journey towards mental well-being..</span>
                            </div>
                            <div className="feature-item-box-row-arrow">
                                <NavLink to='/analysis'>
                                    <span className="material-symbols-outlined">
                                        double_arrow
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="feature-box-col">
                        <div className="feature-box-left-b">
                            <div className="feature-item-box-row">
                                <span className="item-t">Book Appointments.</span>
                            </div>
                            <div className="feature-item-box-row">
                                <span className="item-d">Easily find and book counselling centers or therapists near you. Take the first step towards seeking professional guidance and support for your mental well-being.</span>
                            </div>
                            <div className="feature-item-box-row-arrow">
                                <NavLink to='/analysis'>
                                    <span className="material-symbols-outlined">
                                        double_arrow
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                        <div className="feature-box-right-b">
                            <div className="feature-item-box-row">
                                <span className="item-t">Progress Tracking.</span>
                            </div>
                            <div className="feature-item-box-row">
                                <span className="item-d">Track your mental health journey and witness your progress over time. Gain valuable insights into your personal growth and celebrate milestones along the way.</span>
                            </div>
                            <div className="feature-item-box-row-arrow">
                                <NavLink to='/analysis'>
                                    <span className="material-symbols-outlined">
                                        double_arrow
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Feature