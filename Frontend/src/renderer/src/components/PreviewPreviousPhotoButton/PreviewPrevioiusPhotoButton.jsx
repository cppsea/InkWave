import './PreviewPreviousPhotoButton.css';

const PreviewPreviousPhotoButton = ({setCurrentIndex}) => {

    const handleClickPreviousButton = () => {
        setCurrentIndex(prevValue => prevValue - 1);
    }

    return (  
        <button
            className="preview-previous-button"
            onClick={handleClickPreviousButton}
        >
            {"<"}
        </button>
    );
}
 
export default PreviewPreviousPhotoButton;