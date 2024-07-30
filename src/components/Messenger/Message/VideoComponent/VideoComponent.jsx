import s from './VideoComponent.module.scss';
import { useState, useEffect, useRef } from 'react'; 
import {ReactComponent as PlayIcon} from '../../../../image/messanger/play.svg';
import {ReactComponent as PauseIcon} from '../../../../image/messanger/pauseIcon.svg';

const VideoComponent = ({ message }) => {
    const [thumbnailVideo, setThumbnailVideo] = useState('');
    const [video, setVideo] = useState('');
    const [loadVideo, setLoadVideo] = useState(true);
    const [videoSize, setVideoSize] = useState({});
    const [videoPlay, setVideoPlay] = useState(false);
    const [buttonVis, setButtonVis] = useState(false);
    const [buttonPlay, setButtonPlay] = useState(false);
    const videoRef = useRef();


    useEffect(() => {
        const fileUrl = `data:image/jpeg;base64,${message.jpegThumbnail}`;
        setThumbnailVideo(fileUrl);
        setVideo(message.downloadUrl);
        return

    }, [message]);

    const handleLoadVideo = () => {
        videoRef.current.play();
        setLoadVideo(false);
        setVideoSize({ width: videoRef.current.clientWidth, height: videoRef.current.clientHeight })
    }

    const handleStart = () => {
        if (videoPlay) {
            videoRef.current.pause();
            setVideoPlay(false)
            setButtonPlay(true)
        } else {
            videoRef.current.play();
            setVideoPlay(true)
            setButtonPlay(false)
        }
    }

    const handleVisButton = () => {
        setButtonVis(true)
    }

    const handleHidenButton = () => {
        setButtonVis(false)
    }

    return (
        <div>
            <div onMouseEnter={handleVisButton} onMouseLeave={handleHidenButton} onClick={handleStart} style={{ aspectRatio: `${videoSize.width}/${videoSize.height}` }} className={`${s.image}`}>
            <div className={`${s.button} ${!buttonVis && s.button_hidden}`}>
                {buttonPlay && <PlayIcon/>}
                {!buttonPlay && <PauseIcon/>}
            </div>
                <video ref={videoRef} loop autoplay muted/*  controls */ onLoadedData={handleLoadVideo} src={video}></video>
                <div className={`${s.image}  ${s.image_overlay} ${!loadVideo && s.image_hidden}`}>
                    <img src={thumbnailVideo}></img>
                </div>
            </div>
            {message.caption !== '' && message.caption !== null && <p className={s.caption}>{message.caption}</p>}
        </div>
    )
};

export default VideoComponent;