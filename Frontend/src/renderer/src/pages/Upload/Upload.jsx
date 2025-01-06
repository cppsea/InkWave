import { useRef, useState } from 'react'
import './Upload.css'
import Photo from '../../components/Photo/Photo'
import GenerateNotesButton from '../../components/GenerateNotesButton/GenerateNotesButton'
import PreviewNextPhotoButton from '../../components/PreviewNextPhotoButton/PreviewNextPhotoButton'
import PreviewPreviousPhotoButton from '../../components/PreviewPreviousPhotoButton/PreviewPrevioiusPhotoButton'
import HomeButton from './HomeButton/HomeButton'
import UploadPhotoInput from './UploadPhotoInput/UploadPhotoInput'
import UploadPhotoButton from './UploadPhotoButton/UploadPhotoButton'
import { Link } from 'react-router-dom'

const Upload = () => {
  const photosContainerRef = useRef(null)
  const uploadPhotoInputRef = useRef(null)
  const [takenPhotos, setTakenPhotos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="upload-page">
      <div>
        <UploadPhotoInput
          uploadPhotoInputRef={uploadPhotoInputRef}
          takenPhotos={takenPhotos}
          setTakenPhotos={setTakenPhotos}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      <div className={'upload-page__preview'}>
        <div className="upload-page__preview__container">
          <div className="upload-page__preview__container__photos-array" ref={photosContainerRef}>
            {takenPhotos.map((photo, index) => (
              <Photo key={index} index={index} imageUrl={photo} currentIndex={currentIndex} />
            ))}
          </div>
          <div className="upload-page__preview__container__buttons">
            <UploadPhotoButton
              uploadPhotoInputRef={uploadPhotoInputRef}
              takenPhotos={takenPhotos}
            />
            {takenPhotos.length !== 0 && <GenerateNotesButton />}
          </div>
        </div>
        {takenPhotos.length !== 0 && currentIndex < takenPhotos.length - 1 && (
          <PreviewNextPhotoButton setCurrentIndex={setCurrentIndex} />
        )}
        {takenPhotos.length !== 0 && currentIndex != 0 && (
          <PreviewPreviousPhotoButton setCurrentIndex={setCurrentIndex} />
        )}
      </div>
      <Link to="/">
        <HomeButton
          takenPhotos={takenPhotos}
          setTakenPhotos={setTakenPhotos}
          setCurrentIndex={setCurrentIndex}
        />
      </Link>
    </div>
  )
}

export default Upload
