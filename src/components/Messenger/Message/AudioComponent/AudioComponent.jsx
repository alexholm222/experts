import { useEffect, useState, useRef } from 'react';
import s from './AudioComponent.module.scss';
import { AudioVisualizer } from 'react-audio-visualize';
import { ReactComponent as VoicePlay } from '../../../../image/messanger/voicePlay.svg';
import { ReactComponent as VoicePause } from '../../../../image/messanger/voicePause.svg'

const AudioComponent = ({ message, avatar }) => {
    const [buttonPlay, setButtonPlay] = useState(true);
    const [loadFile, setLoadFile] = useState(false);
    const [time, setTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [duration, setDuration] = useState(0);
    const visualizerRef = useRef(null);
    const audio = useRef(null);
    const clickRef = useRef(null);
 

    useEffect(() => {
        const time = audio?.current?.currentTime;
        setTime(time)
    })


    const handlePlayStop = () => {
        if (buttonPlay) {
            setButtonPlay(false);
            audio.current.play()
        } else {
            setButtonPlay(true);
            audio.current.pause()
        }
    }

    const handleLoadFile = () => {
        setLoadFile(true)
     
    
    }

    const handleStop = () => {
        audio.current.pause();
        audio.current.currentTime = 0;
        setButtonPlay(true);
    }

    const handlePlaying = () => {
        const duration = audio.current.duration;
        const currentTime = audio.current.currentTime;
        setProgress((currentTime/duration)*100);
        setTime(currentTime)
    }

    //функция перемотки записи
    function checkRewind(e) {
       /*  checkTime(e) */
       const duration = audio.current.duration;
       const currentTime = audio.current.currentTime;
       setTimeLeft(duration - currentTime)
        const width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const rewindProgress = offset / width * 100;
        audio.current.currentTime = rewindProgress / 100 * audio.current.duration;
        setProgress(rewindProgress)
        audio.current.pause();
        setButtonPlay(true)
    }
    //функция определения времени при наведении мыши на линию прогресса записи
/*     function checkTime(e) {
        const width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const rewindProgress = offset / width * 100;
        const duration = audioElem.current.duration;
        setIsSongTime(offset);
        setIsSpan(true);
        if (isNaN(duration)) {
            setIsCheckTime('');
        } else {
            setIsCheckTime(roundDuration(rewindProgress / 100 * duration));
        }
    } */

    console.log(duration, timeLeft)

    return (
        <div className={s.audio}>
            <button onClick={handlePlayStop} className={s.button}>
                {buttonPlay && <VoicePlay />}
                {!buttonPlay && <VoicePause />}
            </button>
            <audio onLoad={handleLoadFile} ref={audio} src={message.downloadUrl} onEnded={handleStop} onTimeUpdate={handlePlaying}></audio>
            <div ref={clickRef} className={s.progress} onMouseDown={checkRewind}>
                <div style={{width: `${progress}%`}} className={s.inner}></div>
                {/* <div style={{width: `${progress}%`}} className={`${s.point} ${!buttonPlay && s.point_anim}`}></div> */}
            </div>
            <p className={s.time}>
                {time >= 10 && `00:${Math.floor(time)}`}
                {time < 10 && `00:0${Math.floor(time)}`}
                </p>
        </div>
    )
};

export default AudioComponent;