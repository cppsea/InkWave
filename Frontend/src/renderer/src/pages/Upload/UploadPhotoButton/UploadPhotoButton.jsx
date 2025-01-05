import './UploadPhotoButton.css';

const UploadPhotoButton = ({uploadPhotoInputRef, takenPhotos}) => {
    const handleClickUploadPhoto = () => {
        uploadPhotoInputRef.current?.click()
    }

    return (
        <div>
          <button
            className="upload-photo-button"
            onClick={handleClickUploadPhoto}
          >
            {takenPhotos.length === 0 ? 'Select Photos' : 'Reselect Photos'}
          </button>
        </div>
      );
}

export default UploadPhotoButton;