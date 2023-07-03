import React, { useState } from 'react'
import './Navbar.css'
import UserResults from '../UserResults/UserResults';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Navbar({ users }) {
  const [results, setResults] = useState([])
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false)
  }
  const url = 'https://dev-mindmate.onrender.com/api/v1/users'
  const token = localStorage.getItem('adminAccessToken')
  const handleuserResults = (userId) => {
    axios.get(url + `/userResults/${userId}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((res) => {
      console.log(res);
      if(res?.data?.count === 0){
        toast.error("No progress to show!",{
          style:{
            backgroundColor:"#000",
            color:"#fff"
          }
        })
      }
      setResults(res?.data?.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='navbar'>
      <div className=" top">
        <span className='navbar_item'>MindMate</span>
      </div>
      <div className="navbar_item_row">
        <span className='navbar_item_name'>Home</span>
      </div>
      <div className="navbar_item_row">
        <span className='navbar_item_name'>All Users</span>
        <span className='navbar_item_info'>Click the progress button to see the progress.</span>
      </div>
      <div className="navbar_item_row_user">
        {users && users.map((user, index) => (
          <div className="user_row" key={index}>
            <span onClick={() => {
              handleuserResults(user?._id)
              setTimeout(() => {
                setOpen(true)
              }, 800);
            }} className='navbar_user'>{user?.username}</span>
            <button onClick={() => {
              handleuserResults(user?._id)
              setTimeout(() => {
                setOpen(true)
              }, 800);
            }} className="progress_button">Progress</button>
          </div>
        ))}
      </div>
      {results.length !== 0 && <UserResults results={results} open={open} handleClose={handleClose} />}
    </div>
  )
}

export default Navbar