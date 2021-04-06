import { Canvas } from "@react-three/fiber";
import styles from "./Labs.module.scss";
import OrbitControls from "../components/OrbitControls/OrbitControls";
import { RoundedBox } from "@react-three/drei";

import { Perf } from "r3f-perf";
import { format } from "node:path";

const Labs = () => {
  return (
    <div className={styles.Labs}>
      <h1>LABS</h1>
      <Canvas className={styles.canvas}>
        <Perf />
        <ambientLight intensity={0.3} />
        <RoundedBox
          args={[3, 4, 0.15]}
          radius={0.1}
          smoothness={1}
        >
          <meshStandardMaterial attach="material" color="lightblue" />
        </RoundedBox>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Labs;
