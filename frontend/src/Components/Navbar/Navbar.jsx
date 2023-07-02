import React, { useState } from 'react'
import './Navbar.css'
import SigninModal from '../SigninModal/SigninModal'
import { toast } from 'react-hot-toast';

function Navbar({ token,getcall }) {
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  const userObj = localStorage.getItem('user');
  const user = JSON.parse(userObj);
  console.log(user?.username)
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
      {token ?
        <div className="nav right">
          <>
            <div className="nav-item">
              <span className="nav-title">Hi, {user?.username}</span>
            </div>
            <div className="nav-item">
              <span className="material-symbols-outlined account">
                account_circle
              </span>
            </div>
            <div className="nav-item" onClick={()=>{
              localStorage.clear();
              toast.success('Logout successfull')
              setTimeout(() => {
                window.location.reload()
              }, 500);
            }}>
              <span className="material-icons account">logout</span>
            </div>
          </>
        </div>
        :
        <div className="nav right" onClick={() => {
          setModal(true);
        }}>
          <>
            <div className="nav-item">
              <span className="nav-title">Login</span>
            </div>
            <div className="nav-item">
              {/* <span className="material-symbols-outlined">
            account_circle
          </span> */}
              <span className="nav-title">Signup</span>
            </div>
          </>
        </div>
      }
      <SigninModal getcall={getcall} modal={modal} handleClose={handleClose} />
    </div>
  )
}

export default Navbar