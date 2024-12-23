import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'

const documents = Array(12).fill({})

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Link to="/" className="back_button">
        &lt; Back
      </Link>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="document-grid">
        {documents.map((doc, index) => (
          <div key={index} className="document-card">
            <div className="document-preview">{doc.preview}</div>
            <div className="document-info">
              <strong className="document-title">{doc.title}</strong>
              <p className="document-date">{doc.date}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/notes" className="notes_button">
        Go to Notes Page
      </Link>
    </div>
  )
}

export default Dashboard
