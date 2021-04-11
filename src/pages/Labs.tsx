import styles from "./Labs.module.scss";
// three
import { Canvas } from "@react-three/fiber";
import OrbitControls from "../components/OrbitControls/OrbitControls";

import ThreeCard from "../components/ThreeMeshes/Card";


const Labs = () => {
    return (
    <div className={styles.Labs}>
      <Canvas shadows camera={{ position: [0, 0, 5] }}>
        <ThreeCard />
        <OrbitControls />
      </Canvas>
      {/* <button onClick={() => }>FLIP</button>  */}
    </div>
  );
};

export default Labs;
