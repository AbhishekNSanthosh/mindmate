import React, { useState } from 'react'
import './Navbar.css'
import SigninModal from '../SigninModal/SigninModal'

function Navbar() {
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);
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
      <div className="nav right" onClick={() => {
        setModal(true);
      }}>
        <div className="nav-item">
          <span className="nav-title">Login</span>
        </div>
        <div className="nav-item">
          {/* <span className="material-symbols-outlined">
            account_circle
          </span> */}
          <span className="nav-title">Signup</span>
        </div>
      </div>
      <SigninModal modal={modal} handleClose={handleClose} />
    </div>
  )
}

export default Navbar