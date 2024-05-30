import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import texture from '../../../image/3D/grass.jpg';

const Sphere = () => {
    const textureMap = useLoader(TextureLoader, texture);

return (
    <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[2, 32]} />
        <meshStandardMaterial map={textureMap}/>
    </mesh>
)
};

export default Sphere;