import './GenerateNotesButton.css';

const GenerateNotesButton = ({takenPhoto}) => {

    const handleClickGenerate = async () => {
        const photoInformation = {
            path: takenPhoto.path
        }

        const data = await fetch("http://localhost:1400/api/notes/summary", {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(photoInformation)
        }).then(async (response) => {
            const result = await response.json();
            console.log(result);
        })
    }

    return (  
        <button 
            className="generate-notes-button"
            onClick={handleClickGenerate}
        >
            Generate Notes
        </button>
    );
}
 
export default GenerateNotesButton;