import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Link, useNavigate } from 'react-router-dom'

// dashboard component displaying user notes and allowing viewing or deleting them
const Dashboard = ({ setSelectedNoteId, setNoteContent, setNoteTitle }) => {
  const [documents, setDocuments] = useState([]) // state storing fetched documents
  const [deleteMode, setDeleteMode] = useState(false) // toggle for delete mode (true when user wants to select and delete notes)
  const [selectedDocs, setSelectedDocs] = useState(new Set()) // set of selected coument ID for deletion
  const navigate = useNavigate()

  // fetch documents when component first mounts
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:1400/api/test/notes')
        const result = await response.json()
        if (result.status === 'success') {
          const formattedDocuments = result.data.map((doc) => ({
            // format document data for UI display
            id: doc._id,
            title: doc.name,
            date: new Date(doc.lastUpdated).toLocaleDateString(),
            preview: (doc.md || 'No preview available').slice(0, 250)
          }))
          setDocuments(formattedDocuments)
        }
      } catch (error) {
        console.error('Error fetching documents:', error)
      }
    }

    fetchDocuments()
  }, [])

  // toggle delete mode on or off, if already in delete mode and items selected, delete them
  const toggleDeleteMode = () => {
    if (deleteMode && selectedDocs.size > 0) {
      handleDelete()
    }
    setDeleteMode((prev) => !prev)
  }

  // deletes all selected documents by sending DELETE request to backend
  const handleDelete = async () => {
    if (selectedDocs.size === 0) return

    try {
      for (let id of selectedDocs) {
        await fetch(`http://localhost:1400/api/notes/delete/${id}`, {
          method: 'DELETE'
        })
      }

      // removes deleted documents from state
      setDocuments((prevDocs) => prevDocs.filter((doc) => !selectedDocs.has(doc.id)))
      setSelectedDocs(new Set())
    } catch (error) {
      console.error('Error deleting documents:', error)
    }
  }

  // handles checkbox toggle for selecting/unselecting a document in delete mode
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

  // called when user clicks on a document to open/view it
  const handleClickNote = (noteId, doc) => {
    setSelectedNoteId(noteId) // set selected note ID
    setNoteContent(doc.preview) // set content preview
    setNoteTitle(doc.title) // set note title
    console.log('doc', doc)
    navigate('/notes') // navigate to the note detail view
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
              <div className="document-content" onClick={() => handleClickNote(doc.id, doc)}>
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
