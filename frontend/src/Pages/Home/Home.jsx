import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Banner from '../../Components/Banner/Banner'
import FeaturesRow from '../../Components/FeaturesRow/FeaturesRow'
import Footer from '../../Components/Footer/Footer'

function Home({user,token,getcall}) {
  return (
    <div className="container">
      <div className='home-container'>
        <div className="home-item">
          <Navbar user={user} token={token} getcall={getcall}/>
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