import './PreviewNextPhotoButton.css';

const PreviewNextPhotoButton = ({setCurrentIndex}) => {

    const handleClickNextButton = () => {
        setCurrentIndex(prevValue => prevValue + 1);
    }

    return (  
        <button
            className="preview-next-button"
            onClick={handleClickNextButton}
        >
            {">"}
        </button>
    );
}
 
export default PreviewNextPhotoButton;