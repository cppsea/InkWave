const HomeButton = ({takenPhotos, setTakenPhotos}) => {

    const handleClickHomeButton = () => {
        takenPhotos.forEach(imageUrl => {
            URL.revokeObjectURL(imageUrl);
        })
        setTakenPhotos([]);
    }

    return (  
        <button 
            className="camera-page__home-button"
            onClick={handleClickHomeButton}
        >
            {"< Home"}
        </button>
    );
}
 
export default HomeButton;