import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
      <div className="nav left">
        <div className="nav-item">
          <span className="title">MindMate</span>
        </div>
      </div>
      <div className="nav center">
        <div className="nav-item">
          <span className="nav-title">Home</span>
        </div>
        <div className="nav-item">
          <span className="nav-title">Explore</span>
        </div>
        <div className="nav-item">
          <span className="nav-title">Library</span>
        </div>
        <div className="nav-item">
          <span className="nav-title">Services</span>
        </div>
      </div>
      <div className="nav right">
        <div className="nav-item">
          <span className="nav-title">Hi, Abhiram</span>
        </div>
        <div className="nav-item">
          <span class="material-symbols-outlined">
            account_circle
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar