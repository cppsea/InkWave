const CapturePhotoButton = () => {

    const handleClickCapturePhoto = ({tempCanvas, setDisplayVideo, setClickedCaptureButton, photosContainerRef, videoDisplayRef, 
                                    clickedRetakeButton, setClickedRetakeButton, takenPhotos, setTakenPhotos, currentIndex, 
                                    setCurrentIndex, currentStream, setCurrentStream}) => {
        const context = tempCanvas.getContext("2d");

        setDisplayVideo(false);
        setClickedCaptureButton(true);

        // sets height and weight of photo
        tempCanvas.width = videoDisplayRef.current.videoWidth;
        tempCanvas.height = videoDisplayRef.current.videoHeight;
        photosContainerRef.current.style.width = `${videoDisplayRef.current.videoWidth}px`;
        photosContainerRef.current.style.height = `${videoDisplayRef.current.videoHeight}px`;

        // clears canvas to ensure there are no previous photos on the canvas
        context.clearRect(0, 0, videoDisplayRef.current.videoWidth, videoDisplayRef.current.videoHeight);

        // captures what is showing on the camera and display on canvas tag
        context.drawImage(videoDisplayRef.current, 0, 0, videoDisplayRef.current.videoWidth, videoDisplayRef.current.videoHeight);
        
        if (clickedRetakeButton) {
            setClickedRetakeButton(false);
            // saves image as a jpeg and replaces element at the value of the currentIndex
            tempCanvas.toBlob((newPhoto) => {
                const photoUrl = URL.createObjectURL(newPhoto)
                const newPhotosArray = [...takenPhotos];
                newPhotosArray[currentIndex] = photoUrl;
                setTakenPhotos(newPhotosArray);
            }, "image/jpeg", 1);
        }
        else {
            // saves the image as a jpeg and appends to end of takenPhotos array
            tempCanvas.toBlob((newPhoto) => {
                const photoUrl = URL.createObjectURL(newPhoto)
                setTakenPhotos(prevPhotos => [...prevPhotos, photoUrl]);
            }, "image/jpeg", 1);
            setCurrentIndex(prevValue => prevValue + 1);
        }

        // clears canvas again to ensure there is no image on the canvas after storing the blob in the useState array
        context.clearRect(0, 0, videoDisplayRef.current.videoWidth, videoDisplayRef.current.videoHeight);

        // deactivates desktop camera
        currentStream.getVideoTracks()[0].stop();
        videoDisplayRef.current.srcObject = null;
        setCurrentStream(null);
    }

    return (  
        <button
            className="camera-page__resizable-box__bottom__capture-button"
            onClick={handleClickCapturePhoto}
        />
    );
}
 
export default CapturePhotoButton;