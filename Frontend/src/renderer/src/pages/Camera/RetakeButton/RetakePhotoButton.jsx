import './RetakePhotoButton.css';

const RetakePhotoButton = ({takenPhotos, currentIndex, setDisplayVideo, setClickedRetakeButton}) => {
    
    const handleClickRetakePhoto = () => {
        setDisplayVideo(true);
        setClickedRetakeButton(true);
        URL.revokeObjectURL(takenPhotos[currentIndex]);
    }

    return (  
        <button
            className="retake-photo-button"
            onClick={handleClickRetakePhoto}
        >
            Retake
        </button>
    );
}
 
export default RetakePhotoButton;