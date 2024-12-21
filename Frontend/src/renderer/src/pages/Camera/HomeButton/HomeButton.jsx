const HomeButton = ({setTakenPhotos}) => {

    const handleClickHomeButton = () => {
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