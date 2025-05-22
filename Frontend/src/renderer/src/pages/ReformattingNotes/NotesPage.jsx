/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect } from 'react'
import './NotesPage.css'
import { Link } from 'react-router-dom'
import TurndownService from 'turndown';
import markdownit from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const NotesPage = ({selectedNoteId, noteContent, noteTitle}) => {
  const [pages, setPages] = useState([''])
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [title, setTitle] = useState("Untitled");
  const editorRef = useRef([])
  const turndownService = new TurndownService();
  const md = markdownit();

  useEffect(() => {
    console.log("selected note id", selectedNoteId);
  }, [selectedNoteId])

  useEffect(() => {
    console.log(noteContent);
    const sanitizedContent = sanitizeHtml(md.render(noteContent), {
      allowedTags: ['b', 'i', 'u'],
      allowedAttributes: {}
    })
    const htmlContent = [sanitizedContent];
    setPages(htmlContent);
    editorRef.current[0].innerHTML = htmlContent;
  }, [noteContent])

  useEffect(() => {
    setTitle(noteTitle);
  }, [noteTitle])

  useEffect(() => {
    console.log("pages", pages)
    if (editorRef.current) {
      console.log("editorRef", editorRef.current[0]);
    }
  }, [pages, editorRef])

  // useEffect(() => {
  //   if (editorRef.current) {
  //     console.log("editorRef", editorRef.current[0]);
  //   }
  // }, [editorRef])

/**
 * Focuses the given editor at the specified cursor position.
 *
 * @param {HTMLElement} editor - The contentEditable div to focus.
 * @param {"start" | "end"} position - Where to place the cursor.
 */
    const focusEditor = (editor, position = "start") => {
        if (editor) {
            editor.focus();
            const range = document.createRange();
            range.selectNodeContents(editor);
    
            if (position === "start") {
                range.collapse(true);
            } else if (position === "end") {
                range.collapse(false);
            }
    
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    const handleContentChange = (index, event) => {
      const updatedPages = [...pages];
      const currentEditor = editorRef.current[index];
  
      if (currentEditor) {
        const sanitizedContent = sanitizeHtml(currentEditor.innerHTML, {
          allowedTags: ['b', 'i', 'u'],
          allowedAttributes: {}
        })
          const text = sanitizedContent || '';
          updatedPages[index] = text;

          currentEditor.style.height = "auto"; 
          currentEditor.style.height = `${currentEditor.scrollHeight}px`;

          //resize paper
          const parent = currentEditor.parentNode;
          parent.style.height = `${currentEditor.scrollHeight}px`;
      }
  
      setPages(updatedPages);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  }
/**
 * Handles keyboard events for navigation and deletion.
 * Allows deleting empty pages and jumping between pages with arrows.
 *
 * @param {number} index - Index of the current editor.
 * @param {KeyboardEvent} event - The key event triggered.
 */

  const handleKey = (index, event) => {
    const currentEditor = editorRef.current[index];

    if (event.key === "Backspace" && currentEditor.textContent === "") {
      event.preventDefault();

      if (index > 0) {
        const updatedPages = [...pages];
        updatedPages.splice(index, 1);
        setPages(updatedPages);

        setTimeout(() => {
          const prevEditor = editorRef.current[index - 1];
          if (prevEditor) {
            focusEditor(prevEditor, "end");
          }
        }, 0);
      }
    }

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        if (event.key === "ArrowUp" && range.startOffset === 0 && range.startContainer === currentEditor.firstChild) {
            if (index > 0) {
                focusEditor(editorRef.current[index - 1], "end");
            }
        }

        if (event.key === "ArrowDown") {
            const isCursorAtBottom =
                range.endOffset === currentEditor.textContent.length &&
                (!currentEditor.lastChild || range.endContainer === currentEditor.lastChild);

            if (isCursorAtBottom) {
                event.preventDefault();

                if (index < pages.length - 1) {
                    focusEditor(editorRef.current[index + 1], "start");
                }
            }
        }
    }
};




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

  const handleSave = async () => {
    const updatedPages = editorRef.current.map((editor) => editor?.innerHTML || '')
    const markdownContent = turndownService.turndown(updatedPages[0]);
    setPages(updatedPages)

    console.log("markdown content: ", markdownContent);

    const noteInformation = {
      name: title,
      image: null,
      md: markdownContent
    }

    const data = await fetch(`http://localhost:1400/api/notes/save/${selectedNoteId}`, {
      method: "PATCH",
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(noteInformation)
    }).then(async (response) => {
      console.log(response);
    })

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
        <textarea 
          className="title"
          value={title}
          onChange={handleChangeTitle}
        >
          Untitled
        </textarea>
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