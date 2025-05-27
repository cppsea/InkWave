import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import InkwaveLogo from './image/InkwaveLogo.png'

// home component, navigation for key features
const Home = ({ userID, setUserID }) => {
  const [showPopup, setShowPopup] = useState(false)

  // logs userID to console when component mounts
  useEffect(() => {
    console.log('home page: ', userID)
  }, [])

  // handler to open scan popup
  const handleScanClick = () => {
    setShowPopup(true)
  }

  // handler to close scan popup
  const handleClosePopup = () => {
    setShowPopup(false)
  }

  // placeholder: would fetch the user's most recent document and navigate to it
  const handleOpenRecent = async () => {
    try {
      const response = await fetch(
        'http://localhost:1400/api/notes/recent/${67937b5f5d69699fa872f96e}',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (!response.ok) {
        throw new Error(`Error opening file Stats: ${response.status}`)
      }

      const data = await response.json()
      console.log('fetched recent files: ', data)

      navigate('/ReformattingNotes/NotesPage')
    } catch (error) {
      console.error('Error fetching recent files', error)
    }
  }

  // handler to clear user ID and log out
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
        <Link to="/notes">
          <button className="home-button">Open Recent...</button>
        </Link>
        <Link to="/login">
          <button className="home-button" onClick={handleClickLogOut}>
            Log out
          </button>
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
    </div>
  )
}

export default Home
