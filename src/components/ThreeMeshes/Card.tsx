import { useRef, useState } from "react";

import { RoundedBox } from "@react-three/drei";
import { useSpring, a } from "react-spring/three";
import { useFrame } from "@react-three/fiber";

const ThreeCard = () => {
    const mesh = useRef<THREE.Mesh>(null!);
    const [active, setActive] = useState(false);

    useFrame((state) => {
        // mesh.current.rotation.x = mesh.current.rotation.y += 0.01

    });

    const { rotationY } = useSpring({
        spring: active,
        config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
        rotationY: active ? 0 : Math.PI
    });

    return (
      <a.mesh ref={mesh} onClick={() => setActive(!active)} rotation-y={rotationY} >
        <RoundedBox radius={0.1} args={[3, 5, 0.1]} attach="geometry" />
        <meshStandardMaterial attach="material" color="lightblue" />
      </a.mesh>
    );
  };

export default ThreeCard
