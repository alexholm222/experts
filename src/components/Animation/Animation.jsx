import s from './Animation.module.scss';
import { Canvas } from "@react-three/fiber";
import { Stage, MapControls, FlyControls, DragControls } from '@react-three/drei';
import { Suspense } from 'react';
//components
import Mazda from './Object/Mazda';
import { Bmw } from './Object/Bmw';



const Animation = () => {
    return (
        <div className={s.animation}>
                <Canvas dpr={[0.2, 1]} camera={{ fov: 70, position: [3, 3, 3] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 5, 18]} intensity={0.7} />
                    <MapControls />
                    <Stage shadows={null} environment={'dawn'} >
                        <Suspense fallback={null} >
                            <Mazda />
                           {/*  <Bmw position={[2.4, 1.1, 0.4]}/> */}
                        </Suspense>
                    </Stage>
                </Canvas>

        </div>
    )
};

export default Animation;