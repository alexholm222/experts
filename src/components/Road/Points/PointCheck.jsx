import s from './Point.module.scss';
import { ReactComponent as CheckPoint } from '../../../image/work/checkPoint.svg';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import checkAnim from '../../../image/work/checkAnimation.json';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const PointCheck = () => {
    const [stat, setStat] = useState(false);
    const [animBig, setAnimBig] = useState(false);
    useEffect(() => {
        setAnimBig(true);

        setTimeout(() => {
            setAnimBig(false);
        }, 2500)
    },[])

    const playerRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            if(!stat) {
                setStat(true)
            }  
        }, 3500)
    }, [])

    return (
        <div className={`${s.point_check} ${animBig && s.point_check_big}`}>
            {!stat && <div className={s.container}>
                <Player
                    autoplay
                    loop
                    src={checkAnim}
                    style={{ height: '56px', width: '56px' }}
                    controls={true}
                    ref={playerRef}
                >
                </Player>
            </div>
            }

            {stat && <CheckPoint/>}
        </div>
    )
};

export default PointCheck;