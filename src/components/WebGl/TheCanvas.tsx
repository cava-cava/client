import React, {FunctionComponent, Suspense} from 'react';
import {Perf} from "r3f-perf";
import {Canvas} from "@react-three/fiber";
import styles from "./TheCanvas.module.scss"

type TheCanvasProps = {
    showPerf?: boolean
}

const TheCanvas: FunctionComponent<TheCanvasProps> = ({showPerf = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'), ...props}) => {
    return (
        <div className={styles.TheCanvas}>
            <Canvas>
                <Suspense fallback={null}>
                    {props.children}
                </Suspense>
                <ambientLight intensity={1}/>
                {showPerf && <Perf position={'bottom-right'}/>}
            </Canvas>
        </div>
    );
}

export default TheCanvas;
