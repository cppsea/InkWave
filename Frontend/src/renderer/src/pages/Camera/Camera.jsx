import {useEffect, useRef, useState} from 'react';
import './Camera.css';
import Photo from '../../components/Photo/Photo';
import RetakePhotoButton from './RetakeButton/RetakePhotoButton';
import NextPhotoButton from './NextPhotoButton/NextPhotoButton';
import PreviewNextPhotoButton from '../../components/PreviewNextPhotoButton/PreviewNextPhotoButton';
import PreviewPreviousPhotoButton from '../../components/PreviewPreviousPhotoButton/PreviewPrevioiusPhotoButton';
import HomeButton from './HomeButton/HomeButton';
import GenerateNotesButton from '../../components/GenerateNotesButton/GenerateNotesButton';
import CapturePhotoButton from './CapturePhotoButton/CapturePhotoButton';

const Camera = () => {
    const videoDisplayRef = useRef(null);
    const tempCanvas = document.createElement("canvas");
    const bottomRef = useRef(null);
    const photosContainerRef = useRef(null);
    const [displayVideo, setDisplayVideo] = useState(true);
    const [takenPhotos, setTakenPhotos] = useState([]);
    const [currentStream, setCurrentStream] = useState(null);
    const [displayResumeButton, setDisplayResumeButton] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [clickedRetakeButton, setClickedRetakeButton] = useState(false);

    // const [viewPreviewTest, setViewPreviewTest] = useState(false);

    // const handleTestPreviewImage = () => {
    //     setViewPreviewTest(true);
    // }

    // const handleHidePreviewImage = () => {
    //     setViewPreviewTest(false);
    // }

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
 
    return (  
        <div className="camera-page">
            <div className={displayVideo ? "camera-page__preview" : "camera-page__preview camera-page__preview--display"}>
                {((takenPhotos.length !== 0) && (currentIndex < (takenPhotos.length - 1))) && (
                    <PreviewNextPhotoButton
                        setCurrentIndex={setCurrentIndex}
                    />
                )}

                {((takenPhotos.length !== 0) && (currentIndex != 0)) && (
                    <PreviewPreviousPhotoButton
                        setCurrentIndex={setCurrentIndex}
                    />
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
                        <RetakePhotoButton
                            takenPhotos={takenPhotos}
                            currentIndex={currentIndex}
                            setDisplayVideo={setDisplayVideo}
                            setClickedRetakeButton={setClickedRetakeButton}
                        />
                        {(takenPhotos.length < 3) && 
                            <NextPhotoButton
                                takenPhotos={takenPhotos}
                                setDisplayVideo={setDisplayVideo}
                                setCurrentIndex={setCurrentIndex}
                            />
                        }
                        <GenerateNotesButton/>
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
                        <CapturePhotoButton
                            tempCanvas={tempCanvas}
                            setDisplayVideo={setDisplayVideo}
                            photosContainerRef={photosContainerRef}
                            videoDisplayRef={videoDisplayRef}
                            clickedRetakeButton={clickedRetakeButton}
                            setClickedRetakeButton={setClickedRetakeButton}
                            takenPhotos={takenPhotos}
                            setTakenPhotos={setTakenPhotos}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                            currentStream={currentStream}
                            setCurrentStream={setCurrentStream}
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
            <HomeButton
                takenPhotos={takenPhotos}
                setTakenPhotos={setTakenPhotos}
            />

            {/* {(!viewPreviewTest) ? (
                <button 
                    className="test-priority-one"
                    onClick={handleTestPreviewImage}
                >
                    preview image
                </button>
            ) : (
                <button 
                    className="test-priority-two"
                    onClick={handleHidePreviewImage}
                >
                    hide preview
                </button>
            )} */}
        </div>
    );
}
 
export default Camera;