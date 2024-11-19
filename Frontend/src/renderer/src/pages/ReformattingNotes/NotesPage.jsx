import React, { useRef, useState } from "react";
import './NotesPage.css';


const NotesPage = () => {
    const [pages, setPages ] = useState([""]);
    const editorRef = useRef([]);

    const handleContentChange = (pageIndex, event) => {
        const updatedPages = [...pages];
        updatedPages[pageIndex] = event.target.value; 
    

        const editor = editorRef.current[pageIndex];
        const contentHeight = editor.scrollHeight;
        const editorHeight = editor.clientHeight;
        const threshold = editorHeight * 0.9;
        for (let i = 0; i < pages.length; i++) {
            const currentEditor = editorRef.current[i];
            const currentContentHeight = currentEditor.scrollHeight;
            if (currentContentHeight >= threshold) {
              updatedPages.splice(i + 1, 0, "");
              break; 
            }
          }
    
        setPages(updatedPages); 
        setPages([...pages]);
    }



    return(
        
        
        <div className="app_container">

            
            <header className="header">
                <button className="back_button"> ← Dashboard</button>
                <h1 className="title"> Untitled</h1>
                <button className="save_button"><i class="fas fa-save"></i> save</button>

                </header>

                <div className="main_container">
                <div className="editor_container">
                {pages.map((content, index) => (
                    <div className="editor" key={index}>
                    <div
                        id="editor"
                        ref={(el) => (editorRef.current[index] = el)}
                        value={content}
                        onChange={(event) => handleContentChange(index, event)}
                        className="editor_textarea"
                        contentEditable="true"
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
                <button><b>B</b></button>  
                <button><i>I</i></button>
                <button><u>U</u></button>
                <hr />
                <button><i class="fa-solid fa-font"></i></button>
                <button><i class="fa-solid fa-list-ul"></i></button>
                <button><i class="fa-solid fa-list-ol"></i></button>
                
                <hr />
                <button><i class="fa-solid fa-indent"></i></button>
                <button><i class="fa-solid fa-align-left" id="left_align_button"></i></button>
            </div>
            </div>
            </div>
            

            


    );


};




export default NotesPage