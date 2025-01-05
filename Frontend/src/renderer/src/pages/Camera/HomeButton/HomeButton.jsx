const HomeButton = ({takenPhotos, setTakenPhotos, currentStream, setCurrentStream, videoDisplayRef}) => {

    const handleClickHomeButton = () => {
        takenPhotos.forEach(imageUrl => {
            URL.revokeObjectURL(imageUrl);
        })
        setTakenPhotos([]);

        // deactivates desktop camera
        currentStream.getVideoTracks()[0].stop();
        videoDisplayRef.current.srcObject = null;
        setCurrentStream(null);
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