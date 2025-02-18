import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = ({userID, setUserID}) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log("home page: ", userID);
  }, [])

  const handleScanClick = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const handleOpenRecent = async () => {
    try{
      const response = await fetch('http://localhost:1400/api/notes/recent/${67937b5f5d69699fa872f96e}', {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
        }
      });
      if(!response.ok) {
        throw new Error(`Error opening file Stats: ${response.status}`);

      }
      
      const data = await response.json();
      console.log('fetched recent files: ', data);
    } catch(error){
      console.error('Error fetching recent files', error);
    }
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
        <Link to="/notes">
        <button className="home-button">Open Recent...</button>
        </Link>
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
        <button className="home-button home-button__log-out" onClick={handleClickLogOut}>Log out</button>
      </Link>
    </div>
  )
}

export default Home
