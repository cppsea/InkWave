import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import InkwaveLogo from './image/InkwaveLogo.png'

const Home = ({ userID, setUserID }) => {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    console.log('home page: ', userID)
  }, [])

  const handleScanClick = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const handleClickLogOut = () => {
    setUserID('')
  }

  return (
    <div className="home-container">
      <h1 className="title">InkWave</h1>
      <img src={InkwaveLogo} alt="inkwaveLogo" className="inkwave-logo" />
      <div className="button-container">
        <Link to="/dashboard">
          <button className="home-button">Go to Dashboard...</button>
        </Link>
        <button className="home-button" onClick={handleScanClick}>
          Scan/Take Photos
        </button>
        <button className="home-button">Open Recent...</button>
      </div>

      {showPopup && (
        <div className="popup">
          <button className="close-popup-button" onClick={handleClosePopup}>
            &times;
          </button>
          <Link to="/camera">
            <button className="popup-button">Take Photo or Video</button>
          </Link>
          <Link to="/upload">
            <button className="popup-button">Upload a Picture</button>
          </Link>
        </div>
      )}

      <Link to="/login">
        <button className="home-button home-button__log-out" onClick={handleClickLogOut}>
          Log out
        </button>
      </Link>
    </div>
  )
}

export default Home
