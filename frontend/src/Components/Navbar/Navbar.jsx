import React, { useEffect, useState } from 'react'
import './Navbar.css'
import SigninModal from '../SigninModal/SigninModal'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';

function Navbar({ user }) {
  const [modal, setModal] = useState(false);
  const handleClose = () => setModal(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')))
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [email, setEmail] = React.useState("");
  const url = 'https://dev-mindmate.onrender.com/api/v1/users'
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  console.log(userData)
  useEffect(() => {
    if (token) {
      handleClose()
    }
  }, [])

  const handleusername = (data) => {
    setUsername(data)
  }

  const handlepassword = (data) => {
    setPassword(data)
  }

  const handlemail = (data) => {
    setEmail(data)
  }

  const handleSignup = () => {
    axios.post(url + '/signup', {
      username, email, password
    }).then((res) => {
      console.log(res.data)
      if (res?.data?.statusCode === 201) {
        toast.success(res?.data?.message);
      } else {
        toast.error('Something went wrong!')
      }
    }).catch((err) => {
      toast.error('Something went wrong!')
      console.log(err)
    })
  }

  const handleLogin = () => {
    axios.post(url + '/login', {
      username, password
    }).then((res) => {
      console.log(res.data);
      // getcall(true)
      setUserData(res?.data?.data)
      localStorage.setItem('accessToken', res?.data?.accessToken)
      localStorage.setItem('user', JSON.stringify(res?.data?.data))
      toast.success(res?.data?.message);
      handleClose()
    }).catch((err) => {
      toast.error('Something went wrong!')
      console.log(err)
    })
  }

  return (
    <div className='navbar'>
      <div className="nav left">
        <div className="nav-item">
          <span className="title" onClick={() => {
            navigate('/')
          }}>MindMate</span>
        </div>
      </div>
      <div className="nav center">
        <div className="nav-item">
          <span className="nav-title" onClick={() => {
            navigate('/')
          }}>Home</span>
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
            <div className="nav-item" onClick={() => {
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
      <SigninModal handleusername={handleusername} handlepassword={handlepassword} handlemail={handlemail} handleLogin={handleLogin} handleSignup={handleSignup} modal={modal} handleClose={handleClose} />
    </div>
  )
}

export default Navbar