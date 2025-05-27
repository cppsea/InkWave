import './HomeButton.css'

const HomeButton = ({ takenPhotos, setTakenPhotos, setCurrentIndex }) => {
  const handleClickHomeButton = () => {
    URL.revokeObjectURL(takenPhotos.fileUrl);
    setTakenPhotos([])
    setCurrentIndex(0)
  }

  return (
    <button className="home-button-upload" onClick={handleClickHomeButton}>
      {'< Home'}
    </button>
  )
}

export default HomeButton
