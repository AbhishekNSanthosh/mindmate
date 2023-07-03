import React, { useEffect, useState } from 'react';
import './Resources.css'
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Resources() {
  const [resources, setReources] = useState([])
  const token = localStorage.getItem('accessToken')
  const url = 'https://dev-mindmate.onrender.com/api/v1/users'

  const getResources = () => {
    axios.get(url + '/getResources', {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((res) => {
      console.log(res?.data?.data)
      setReources(res?.data?.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  const navigate = useNavigate();
  useEffect(() => {
    getResources();
  }, [])

  return (
    <div className='resources'>
      <div className="nav_wrap">
        <Navbar />
      </div>
      <div className="resources_wrap">
        <div className="resources_grid">
          {resources && resources.map((resource) => (
            <div className="resources_item" onClick={() => {
              navigate('/resources/info', { state: resource })
            }}>
              {resource?.resourceTitle}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Resources