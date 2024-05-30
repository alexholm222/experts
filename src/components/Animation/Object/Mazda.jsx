import { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei';

const Mazda = (props) => {
  const [play, setPlay] = useState(false)
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/mazda/mazda.gltf')
  const { actions, names } = useAnimations(animations, group)

  const startAnim = () => {
    if (play) {
      actions[names[0]]?.stop();
    } else {
      actions[names[0]]?.play();
    }
  }





  return (
    <group onClick={startAnim} ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Cube002_6" position={[0, 1.81, 1.839]} scale={[0.892, 0.782, 2.159]}>
                <mesh name="Object_13" geometry={nodes.Object_13.geometry} material={materials.Material} />
                <mesh name="Object_14" geometry={nodes.Object_14.geometry} material={materials['Material.002']} />
                <mesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials['Material.004']} />
                <mesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials['Material.013']} />
                <mesh name="Object_17" geometry={nodes.Object_17.geometry} material={materials['Material.014']} />
              </group>
              <group name="Cube001_5" position={[0.074, 2.017, 0.771]} rotation={[0, 0, -0.008]} scale={[0.977, 1, 1]}>
                <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials['Material.001']} />
                <mesh name="Object_5" geometry={nodes.Object_5.geometry} material={materials.Material} />
                <mesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials['Material.002']} />
                <mesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials['Material.004']} />
                <mesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials['Material.011']} />
                <mesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials['Material.012']} />
                <mesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials['Material.015']} />
                <mesh name="Object_11" geometry={nodes.Object_11.geometry} material={materials['Material.021']} />
              </group>
              <group name="Circle002_7" position={[-0.84, 1.469, -1.237]} rotation={[0, 0, -Math.PI / 2]} scale={0.212}>
                <mesh name="Object_19" geometry={nodes.Object_19.geometry} material={materials['Material.005']} />
                <mesh name="Object_20" geometry={nodes.Object_20.geometry} material={materials['Material.006']} />
              </group>
              <group name="Plane_9" position={[0.001, 1.146, 0.025]} rotation={[-Math.PI, 0, -Math.PI]} scale={[1.605, 2.027, 2.192]}>
                <mesh name="Object_22" geometry={nodes.Object_22.geometry} material={materials['Material.010']} />
              </group>
              <group name="Circle001_10" position={[0.837, 1.469, 1.21]} rotation={[0, 0, -Math.PI / 2]} scale={0.212}>
                <mesh name="Object_24" geometry={nodes.Object_24.geometry} material={materials['Material.005']} />
                <mesh name="Object_25" geometry={nodes.Object_25.geometry} material={materials['Material.006']} />
              </group>
              <group name="Circle003_11" position={[0.837, 1.469, -1.237]} rotation={[0, 0, -Math.PI / 2]} scale={0.212}>
                <mesh name="Object_27" geometry={nodes.Object_27.geometry} material={materials['Material.005']} />
                <mesh name="Object_28" geometry={nodes.Object_28.geometry} material={materials['Material.006']} />
              </group>
              <group name="Circle004_12" position={[-0.84, 1.469, 1.21]} rotation={[0, 0, -Math.PI / 2]} scale={0.212}>
                <mesh name="Object_30" geometry={nodes.Object_30.geometry} material={materials['Material.005']} />
                <mesh name="Object_31" geometry={nodes.Object_31.geometry} material={materials['Material.006']} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/mazda.gltf');

export default Mazda;
