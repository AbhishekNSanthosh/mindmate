import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Banner from '../../Components/Banner/Banner'
import FeaturesRow from '../../Components/FeaturesRow/FeaturesRow'
import Footer from '../../Components/Footer/Footer'

function Home() {
  return (
    <div className="container">
      <div className='home-container'>
        <div className="home-item">
          <Navbar />
        </div>
        <div className="home-item">
          <Banner />
        </div>
      </div>
      <FeaturesRow />
      <Footer/>
    </div>
  )
}

export default Home