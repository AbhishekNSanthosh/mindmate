import React from 'react'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
        <div className=" top">
            <span className='navbar_item'>MindMate</span>
        </div>
        <div className="navbar_item_row">
            <span className='navbar_item_name'>Home</span>
        </div>
    </div>
  )
}

export default Navbar