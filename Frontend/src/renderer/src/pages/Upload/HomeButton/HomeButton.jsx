import './HomeButton.css'

const HomeButton = ({ setTakenPhotos, setCurrentIndex }) => {
  const handleClickHomeButton = () => {
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
