import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp, setTimer, status }) => {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

 
    useEffect(() => {
        if(status == 'pause') {
            setTimer(hours * 60 + minutes);
            return
        }

    }, [hours, minutes])

    
    useEffect(() => {
        if(status == 'end') {
            setTimer(seconds);
            return
        }

    }, [seconds])

    return (
        <></>
    );
};

export default Timer;
