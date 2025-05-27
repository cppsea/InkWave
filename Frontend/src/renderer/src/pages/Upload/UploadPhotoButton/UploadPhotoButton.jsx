import './UploadPhotoButton.css';

const UploadPhotoButton = ({uploadPhotoInputRef, takenPhotos, setTakenPhotos}) => {
    // const handleClickUploadPhoto = () => {
    //     uploadPhotoInputRef.current?.click()
    // }

    const handleTest = async() => {
        const fileData = await window.fileInteraction.getFileData();
        const filePathWithoutSpaces = encodeURIComponent(fileData.path);
        const fileBlob = new Blob([fileData.content], {type: 'image/jpeg'});

        console.log("object", fileData);
        const fileDataReady = {
          path: filePathWithoutSpaces,
          fileUrl: URL.createObjectURL(fileBlob)
        }
        setTakenPhotos(fileDataReady);
        console.log(fileDataReady);
    }


    return (
        <div>
          <button
            className="upload-photo-button"
            // onClick={handleClickUploadPhoto}
            onClick={handleTest}
          >
            {takenPhotos.length === 0 ? 'Select Photos' : 'Reselect Photos'}
          </button>
        </div>
      );
}

export default UploadPhotoButton;