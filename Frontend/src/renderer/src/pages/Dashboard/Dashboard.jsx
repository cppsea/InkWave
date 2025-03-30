import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [documents, setDocuments] = useState([])
  const [deleteMode, setDeleteMode] = useState(false)
  const [selectedDocs, setSelectedDocs] = useState(new Set())

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

  const toggleDeleteMode = () => {
    if (deleteMode && selectedDocs.size > 0) {
      handleDelete()
    }
    setDeleteMode((prev) => !prev)
  }

  const handleDelete = async () => {
    if (selectedDocs.size === 0) return

    try {
      for (let id of selectedDocs) {
        await fetch(`http://localhost:1400/api/notes/delete/${id}`, {
          method: 'DELETE'
        })
      }

      setDocuments((prevDocs) => prevDocs.filter((doc) => !selectedDocs.has(doc.id)))
      setSelectedDocs(new Set())
    } catch (error) {
      console.error('Error deleting documents:', error)
    }
  }

  const handleCheckboxChange = (id) => {
    setSelectedDocs((prev) => {
      const newSelection = new Set(prev)
      if (newSelection.has(id)) {
        newSelection.delete(id)
      } else {
        newSelection.add(id)
      }
      return newSelection
    })
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <Link to="/" className="back_button">
          &lt; Back
        </Link>
        <h1 className="dashboard-title">Dashboard</h1>
        <button className="delete-button" onClick={toggleDeleteMode}>
          {deleteMode ? 'Confirm Delete' : 'Delete'}
        </button>
      </div>
      <div className="document-grid">
        {documents.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className={`document-card ${deleteMode ? 'delete-mode' : ''}`}>
              {deleteMode && (
                <input
                  type="checkbox"
                  className="delete-checkbox"
                  checked={selectedDocs.has(doc.id)}
                  onChange={() => handleCheckboxChange(doc.id)}
                />
              )}
              <div className="document-content">
                <div className="document-preview">{doc.preview}</div>
                <div className="document-info">
                  <strong className="document-title">{doc.title}</strong>
                  <p className="document-date">{doc.date}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Link to="/notes" className="notes_button">
        Go to Notes Page
      </Link>
    </div>
  )
}

export default Dashboard
