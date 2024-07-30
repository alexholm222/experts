
import s from './ImageComponent.module.scss';
import { useState, useEffect } from 'react';

const ImageComponent = ({ message, phone }) => {
    const [thumbnailImage, setThumbnailImage] = useState('');
    const [image, setImage] = useState('');
    const [loadImage, setLoadImage] = useState(true);
    const [imageSize, setImageSize] = useState({});
    const img = new Image();
    img.src = message.downloadUrl;


    useEffect(() => {
        const fileUrl = `data:image/jpeg;base64,${message.jpegThumbnail}`;
        setThumbnailImage(fileUrl);
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
            <a className="images-block__photo" data-fancybox={phone} href={image}>
                <div style={{ aspectRatio: `${imageSize.width}/${imageSize.height}` }} className={`${s.image} ${loadImage && s.image_hidden}`}>
                    <img onLoad={handleLoadImage} src={image}></img>

                    <div className={`${s.image}  ${s.image_overlay} ${!loadImage && s.image_hidden}`}>
                        <img src={thumbnailImage}></img>
                    </div>
                </div>
            </a>
            {message.caption !== '' && message.caption !== null && <p className={s.caption}>{message.caption}</p>}
        </div>
    )
};

export default ImageComponent;
