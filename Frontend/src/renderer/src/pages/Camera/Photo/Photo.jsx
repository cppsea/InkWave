import {useEffect, useState} from 'react';
import './Photo.css';

const Photo = ({imageUrl, index, currentIndex}) => {
    const [displayPhoto, setDisplayPhoto] = useState(false);

    useEffect(() => {
        if (currentIndex === index) {
            setDisplayPhoto(true);
        }
        else {
            setDisplayPhoto(false);
        }
    }, [currentIndex])

    return (  
        <img
            className={!displayPhoto ? "photo" : "photo photo--display"}
            src={imageUrl}
            alt="not found"
        />
    );
}
 
export default Photo;