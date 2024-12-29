import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css' // Global styles

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
