import {useEffect, useRef, useState} from 'react';
import './Camera.css';
import Photo from './Photo';

const Camera = () => {
    const videoDisplayRef = useRef(null);
    const tempCanvas = document.createElement("canvas");
    const bottomRef = useRef(null);
    const photosContainerRef = useRef(null);
    const [displayVideo, setDisplayVideo] = useState(true);
    const [takenPhotos, setTakenPhotos] = useState([]);
    const [currentStream, setCurrentStream] = useState(null);
    const [displayResumeButton, setDisplayResumeButton] = useState(false);
    const [clickedCaptureButton, setClickedCaptureButton] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [clickedRetakeButton, setClickedRetakeButton] = useState(false);
      

    const handleClickCapturePhoto = () => {
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
        // currentStream.getTracks().forEach(track => track.stop());
        currentStream.getVideoTracks()[0].stop();

        // setTimeout(() => {
            videoDisplayRef.current.srcObject = null;
        // }, 500)
        setCurrentStream(null);
    }

    // activates desktop camera
    const handleGetCameraView = () => {
        setDisplayResumeButton(false);
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then((cameraStream) => {
            videoDisplayRef.current.srcObject = cameraStream;
            videoDisplayRef.current.play();
            setCurrentStream(cameraStream);
        })
        .catch((error) => {
            console.log(error);
            setDisplayResumeButton(true);
        })
    }

    const handleClickRetakePhoto = () => {
        setDisplayVideo(true);
        // URL.revokeObjectURL(takenPhotos[takenPhotos.length - 1]);
        // setTakenPhotos((prevImages) => prevImages.slice(0, prevImages.length - 1));  
        URL.revokeObjectURL(takenPhotos[currentIndex]);
        setClickedRetakeButton(true);
    }

    const handleClickTakeNextPhoto = () => {
        setDisplayVideo(true);
        setCurrentIndex(takenPhotos.length - 1);
    }

    const handleClickHomeButton = () => {
        setTakenPhotos([]);
    }

    const handleClickNextButton = () => {
        setCurrentIndex(prevValue => prevValue + 1);
    }

    const handleClickPreviousButton = () => {
        setCurrentIndex(prevValue => prevValue - 1);
    }

    useEffect(() => {
        if (videoDisplayRef.current && displayVideo) {
            handleGetCameraView();
        }
    }, [videoDisplayRef, displayVideo])

    useEffect(() => {
        console.log("array", takenPhotos);
    }, [takenPhotos])

    useEffect(() => {
        if (displayVideo && (currentStream === null)) {
            handleGetCameraView();
        }
        else {
            setDisplayResumeButton(false);
        }
    }, [currentStream])

    const handleClickTestPreview = () => {
        setShowPreview(true);
        console.log("running");
    }

    const handleClickReturnToCamera = () => {
        setShowPreview(false);
    }
 
    return (  
        <div className="camera-page">
            <div className={displayVideo ? "camera-page__preview" : "camera-page__preview camera-page__preview--display"}>
                {((takenPhotos.length !== 0) && (currentIndex < (takenPhotos.length - 1))) && (
                    <button
                        className="camera-page__preview__container__next-button"
                        onClick={handleClickNextButton}
                    >
                        {">"}
                    </button>
                )}

                {((takenPhotos.length !== 0) && (currentIndex != 0)) && (
                    <button
                        className="camera-page__preview__container__previous-button"
                        onClick={handleClickPreviousButton}
                    >
                        {"<"}
                    </button>
                )}

                <div className="camera-page__preview__container">
                    <div 
                        className="camera-page__preview__container__photos-array"
                        ref={photosContainerRef}
                    >
                        {takenPhotos.map((photo, index) => (
                            <Photo
                                key={index}
                                index={index}
                                imageUrl={photo}
                                currentIndex={currentIndex}
                            />
                        ))}
                    </div>
                    <div className="camera-page__preview__container__buttons">
                        <button
                            className="camera-page__preview__container__buttons__retake"    
                            onClick={handleClickRetakePhoto}
                        >
                            Retake
                        </button>
                        {(takenPhotos.length < 3) && 
                        <button
                            className="camera-page__preview__container__buttons__next-photo"    
                            onClick={handleClickTakeNextPhoto}
                        >
                            Next Photo
                        </button>
                        }
                        <button className="camera-page__preview__container__buttons__generate-notes">
                            Generate Notes
                        </button>
                    </div>
                </div>
            </div>
             {displayVideo && ( 
                <div className="camera-page__resizable-box">
                    <video
                        className="camera-page__resizable-box__video"
                        ref={videoDisplayRef}
                    />
                    <div 
                        className="camera-page__resizable-box__bottom"
                        ref={bottomRef}
                    >
                    {(currentStream !== null) &&
                        <button
                            className="camera-page__resizable-box__bottom__capture-button"
                            onClick={handleClickCapturePhoto}
                        />
                    }
                    </div>
                    {(displayResumeButton) && (
                        <button
                            className="camera-page__preview__container__buttons__resume"
                            onClick={handleGetCameraView}
                        >
                            Resume
                        </button>
                    )}
                </div>
            )}
            <button 
                className="camera-page__home-button"
                onClick={handleClickHomeButton}
            >
                {"< Home"}
            </button>
        </div>
    );
}
 
export default Camera;