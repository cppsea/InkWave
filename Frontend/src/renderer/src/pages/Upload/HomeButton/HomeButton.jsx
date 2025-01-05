import './HomeButton.css';

const HomeButton = ({takenPhotos, setTakenPhotos, setCurrentIndex}) => {

    const handleClickHomeButton = () => {
        takenPhotos.forEach(imageUrl => {
            URL.revokeObjectURL(imageUrl);
        })
        setTakenPhotos([]);
        setCurrentIndex(0);
    }

    return (  
        <button 
            className="home-button"
            onClick={handleClickHomeButton}
        >
            {"< Home"}
        </button>
    );
}
 
export default HomeButton;