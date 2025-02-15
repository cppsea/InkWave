import React, { useState } from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotesPage from '/src/pages/ReformattingNotes/NotesPage.jsx'
import '/src/pages/ReformattingNotes/NotesPage.css'
import Camera from './pages/Camera/Camera'
import Dashboard from './pages/Dashboard/Dashboard'
import Upload from './pages/Upload/Upload'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

function App() {

  const [userID, setUserID] = useState("");

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home userID={userID}/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/login" element={<Login setUserID={setUserID}/>} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App