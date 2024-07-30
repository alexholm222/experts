import s from './StickerComponent.module.scss';
import { useState, useEffect } from 'react';

const StickerComponent = ({ message }) => {
    const [image, setImage] = useState('');
    const [loadImage, setLoadImage] = useState(true);
    const [imageSize, setImageSize] = useState({});
    const img = new Image();
    img.src = message.downloadUrl;


    useEffect(() => {
        const fileUrl = `data:image/jpeg;base64,${message.jpegThumbnail}`;
        setImage(message.downloadUrl);
        setTimeout(() => {
           
        })

        return

    }, [message]);

    const handleLoadImage = () => {
        setLoadImage(false);
        setImageSize({ width: img.width, height: img.height })
    }

    return (
        <div>
            
                <div style={{ aspectRatio: `${imageSize.width}/${imageSize.height}` }} className={`${s.image} ${loadImage && s.image_hidden}`}>
                    <img onLoad={handleLoadImage} src={image}></img>
                </div>
      
        </div>
    )
};

export default StickerComponent;