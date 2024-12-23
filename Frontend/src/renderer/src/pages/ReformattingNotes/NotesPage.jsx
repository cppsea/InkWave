/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react'
import './NotesPage.css'
import { Link } from 'react-router-dom'

const NotesPage = () => {
  const [pages, setPages] = useState([''])
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const editorRef = useRef([])

  const handleContentChange = (pageIndex, event) => {
    const updatedPages = [...pages]
    updatedPages[pageIndex] = editorRef.current[pageIndex].innerHTML

    const editor = editorRef.current[pageIndex]
    const contentHeight = editor.scrollHeight
    const editorHeight = editor.clientHeight
    const threshold = editorHeight * 0.9

    for (let i = 0; i < pages.length; i++) {
      const currentEditor = editorRef.current[i]
      const currentContentHeight = currentEditor.scrollHeight
      if (currentContentHeight >= threshold) {
        updatedPages.splice(i + 1, 0, '')
        break
      }
    }

    setPages(updatedPages)
    setPages([...pages])
  }

  //works for italic/undelrine
  const applyFormatting = (command) => {
    const selection = window.getSelection()
    const selectedText = selection.toString()

    if (!selectedText) return

    if (command === 'bold') {
      setIsBold(!isBold)
      document.execCommand('styleWithCSS', false, true)
      document.execCommand('bold', false, null)
    } else if (command === 'italic') {
      setIsItalic(!isItalic)
      document.execCommand('italic', false, null)
    } else if (command === 'underline') {
      setIsUnderline(!isUnderline)
      document.execCommand('underline', false, null)
    }
  }

  const handleSave = () => {
    const updatedPages = editorRef.current.map((editor) => editor?.innerHTML || '')
    setPages(updatedPages)

    //(used to see it being saved in console)
    console.log('Saved content:', updatedPages)
  }

  ;<div className="preview">
    <h3>Saved Content:</h3>
    {pages.map((content, index) => (
      <div key={index} dangerouslySetInnerHTML={{ __html: content }} />
    ))}
  </div>

  return (
    <div className="app_container">
      <header className="header">
        <Link to="/dashboard" className="back_button">
          ← Dashboard
        </Link>
        <h1 className="title">Untitled</h1>
        <button className="save_button" onClick={handleSave}>
          <i className="fas fa-save"></i> Save
        </button>
      </header>

      <div className="main_container">
        <div className="editor_container">
          {pages.map((content, index) => (
            <div className="editor" key={index}>
              <div
                id="editor"
                ref={(el) => (editorRef.current[index] = el)}
                contentEditable="true"
                value={content}
                onInput={(event) => handleContentChange(index, event)}
                className="editor_textarea"
              />
            </div>
          ))}
        </div>

        <div className="toolbar toolbar-left">
          <button id="red"></button>
          <button id="orange"></button>
          <button id="yellow"></button>
          <button id="lightgreen"></button>
          <button id="darkgreen"></button>
          <button id="lightblue"></button>
          <button id="darkblue"></button>
          <button id="magenta"></button>
          <button id="white"></button>
          <button id="black"></button>
        </div>

        <div className="toolbar toolbar-right">
          <button>12</button>
          <button
            onClick={() => applyFormatting('bold')}
            style={{ fontWeight: isBold ? 'bold' : 'normal' }}
          >
            <b>B</b>
          </button>
          <button
            onClick={() => applyFormatting('italic')}
            style={{ fontStyle: isItalic ? 'italic' : 'normal' }}
          >
            <i>I</i>
          </button>
          <button
            onClick={() => applyFormatting('underline')}
            style={{ textDecoration: isUnderline ? 'underline' : 'none' }}
          >
            <u>U</u>
          </button>
          <hr />
          <button>
            <i class="fa-solid fa-font"></i>
          </button>
          <button>
            <i class="fa-solid fa-list-ul"></i>
          </button>
          <button>
            <i class="fa-solid fa-list-ol"></i>
          </button>

          <hr />
          <button>
            <i class="fa-solid fa-indent"></i>
          </button>
          <button>
            <i class="fa-solid fa-align-left" id="left_align_button"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotesPage
