import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className='footer'>
            <div className="footer-left">
                <div className="footer-title-box">
                    <span className="footer-title">MindMate</span>
                </div>
                <div className="footer-title-box">
                    <span className="footer-desc">A place for enhancing our wellbeing</span>
                </div>
                <div className="footer-title-box gap">
                    <span className="footer-desc">© 2023 MindMate. All rights reserved.</span>
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-right-col">
                    <div className="footer-right-item">
                        <span className="footer-desc">About us</span>
                    </div>
                    <div className="footer-right-item">
                        <span className="footer-desc">Terms of service</span>
                    </div>
                    <div className="footer-right-item">
                        <span className="footer-desc">Cookies policy</span>
                    </div>
                </div>
                <div className="footer-right-col">
                    <div className="footer-right-item">
                        <span className="footer-desc">Faq</span>
                    </div>
                    <div className="footer-right-item">
                        <span className="footer-desc">License summary</span>
                    </div>
                    <div className="footer-right-item">
                        <span className="footer-desc">Privacy policy</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer