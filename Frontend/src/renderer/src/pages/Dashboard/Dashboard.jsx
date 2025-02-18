import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:1400/api/test/notes')
        const result = await response.json()
        if (result.status === 'success') {
          const formattedDocuments = result.data.map((doc) => ({
            id: doc._id,
            title: doc.name,
            date: new Date(doc.lastUpdated).toLocaleDateString(),
            preview: doc.md || 'No preview available'
          }))
          setDocuments(formattedDocuments)
        }
      } catch (error) {
        console.error('Error fetching documents:', error)
      }
    }

    fetchDocuments()
  }, [])

  return (
    <div className="dashboard">
      <Link to="/" className="back_button">
        &lt; Back
      </Link>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="document-grid">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
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
