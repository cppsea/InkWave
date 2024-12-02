import {useEffect, useRef, useState} from 'react';
import './Camera.css';

const Camera = () => {
    const videoDisplayRef = useRef(null);
    const canvasRef = useRef(null);
    const bottomRef = useRef(null);
    const [displayVideo, setDisplayVideo] = useState(true);
    const [clearCanvas, setClearCanvas] = useState(false);
    const [takenPhotos, setTakenPhotos] = useState([]);
    const [currentStream, setCurrentStream] = useState(null);
    const [displayResumeButton, setDisplayResumeButton] = useState(false);

    const handleClickCapturePhoto = () => {
        const context = canvasRef.current.getContext("2d");
        setDisplayVideo(false);
        canvasRef.current.width = videoDisplayRef.current.videoWidth;
        canvasRef.current.height = videoDisplayRef.current.videoHeight;

        // captures what is showing on the camera and display on canvas tag
        context.drawImage(videoDisplayRef.current, 0, 0, videoDisplayRef.current.videoWidth, videoDisplayRef.current.videoHeight);
        
        // deactivates desktop camera
        currentStream.getTracks().forEach(track => track.stop());
        videoDisplayRef.current.srcObject = null;
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
        setClearCanvas(true);
    }

    const handleClickTakeNextPhoto = () => {
        setDisplayVideo(true);
        setClearCanvas(true);

        // adds new photo to selection of photos taken
        canvasRef.current.toBlob((newPhoto) => {
            setTakenPhotos(prevPhotos => [...prevPhotos, newPhoto]);
        }, "image/jpeg", 1);
    }

    const handleClickHomeButton = () => {
        setTakenPhotos([]);
    }

    // clears the canvas
    useEffect(() => {
        if (clearCanvas) {
            const context = canvasRef.current.getContext("2d");
            context.clearRect(0, 0, videoDisplayRef.current.videoWidth, videoDisplayRef.current.videoHeight);
            setClearCanvas(false);
        }
    }, [clearCanvas])

    useEffect(() => {
        if (videoDisplayRef.current) {
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

    return (  
        <div className="camera-page">
            <div className={displayVideo ? "camera-page__preview" : "camera-page__preview camera-page__preview--display"}>
                <div className="camera-page__preview__container">
                    <canvas 
                        className="camera-page__preview__container__photo"
                        ref={canvasRef}
                    />
                    <div className="camera-page__preview__container__buttons">
                        <button
                            className="camera-page__preview__container__buttons__retake"    
                            onClick={handleClickRetakePhoto}
                        >
                            Retake
                        </button>
                        {(takenPhotos.length < 2) && 
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