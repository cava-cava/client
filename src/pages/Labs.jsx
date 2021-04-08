import styles from "./Labs.module.scss";
import { useRef, useEffect, useState } from "react";
// three
import { Canvas, useFrame } from "@react-three/fiber";
import OrbitControls from "../components/OrbitControls/OrbitControls";
import { RoundedBox, MeshWobbleMaterial } from "@react-three/drei";
import { useSpring, a } from "react-spring/three";
import { BoxBufferGeometry } from "three";

import ThreeCard from "../components/ThreeMeshes/Card";


const Labs = () => {
  return (
    <div className={styles.Labs}>
      <Canvas  shadowMap colorManagement camera={{ position: [0, 0, 5] }}>
        <ThreeCard />
        <OrbitControls />
      </Canvas>
      {/* <button onClick={() => }>FLIP</button>  */}
    </div>
  );
};

export default Labs;
