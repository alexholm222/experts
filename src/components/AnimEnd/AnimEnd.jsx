import { Player, Controls } from '@lottiefiles/react-lottie-player';
import cat from '../../image/buttonLoad.json';

const AnimEnd = () => {
    return (
        <Player
            autoplay
            loop
            src={cat}
            style={{ height: '48px', width: '48px', marginBottom: '0' }}
            controls={true}
        >
        </Player>
    )
};

export default AnimEnd;