import { useRef, useEffect, useState } from "react";

import { RoundedBox, MeshWobbleMaterial } from "@react-three/drei";
import { useSpring, a } from "react-spring/three";
import { useFrame } from "@react-three/fiber";

const ThreeCard = () => {
    const mesh = useRef<THREE.Mesh>(null!); 
    const [flipped, setFlipped] = useState(false)

    useFrame((state) => {
        // mesh.current.rotation.x = mesh.current.rotation.y += 0.01

    });
  

      const spring = useSpring({
        rotation: flipped ? {x: 0, y: 0, z: 0} : {x: 0, y: 0, z: 0}
      });

    return (
      <a.mesh ref={mesh} onClick={() => setFlipped(!flipped)} rotation={spring.rotation} >
        <RoundedBox radius={0.1} args={[3, 5, 0.1]} attach="geometry" />
        <meshStandardMaterial attach="material" color="lightblue" />
      </a.mesh>
    );
  };

export default ThreeCard 