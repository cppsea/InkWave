import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [showPopup, setShowPopup] = useState(false)

  const handleScanClick = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="home-container">
      <h1 className="title">InkWave</h1>
      <div className="image-placeholder"></div>

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
        </div>
      )}
    </div>
  )
}

export default Home
