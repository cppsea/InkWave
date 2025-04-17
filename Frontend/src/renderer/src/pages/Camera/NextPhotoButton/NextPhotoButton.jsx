import './NextPhotoButton.css';

const NextPhotoButton = ({takenPhotos, setDisplayVideo, setCurrentIndex}) => {

    const handleClickTakeNextPhoto = () => {
        setDisplayVideo(true);
        setCurrentIndex(takenPhotos.length - 1);
    }

    return (  
        <button
            className="next-photo-button"    
            onClick={handleClickTakeNextPhoto}
        >
            Next Photo
        </button>
    );
}
 
export default NextPhotoButton;