const UploadPhotoInput = ({uploadPhotoInputRef, takenPhotos, setTakenPhotos, setCurrentIndex}) => {
    
    const handlePhotoInput = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // prevents user from uploading more than 3 photos
        if (selectedFiles.length > 3) {
            alert('You can only add a maximum of 3 files');
            return true;
        }

        // clears takenPhotos array when reselecting photos
        if (takenPhotos.length > 0) {
            setTakenPhotos([]);
        }

        // sets all uploaded photos to the takenPhotos array
        selectedFiles.forEach((photo) => {
            const photoUrl = URL.createObjectURL(photo)
            setTakenPhotos(prevPhotos => [...prevPhotos, photoUrl]);
        });
        setCurrentIndex(0);
    }

    return (
        <input type="file" ref={uploadPhotoInputRef} multiple accept="image/jpeg, image/png" onChange={handlePhotoInput} hidden/>
    );
}

export default UploadPhotoInput;