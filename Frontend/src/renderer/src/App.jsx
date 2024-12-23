import React from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotesPage from '/src/pages/ReformattingNotes/NotesPage.jsx'
//import '/src/pages/ReformattingNotes/NotesPage.css'
import Camera from './pages/Camera/Camera'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App

/*
      <NotesPage />
      <Camera />
*/
