import React, {FunctionComponent} from 'react';
import {Perf} from "r3f-perf";
import {Canvas, useThree} from "@react-three/fiber";
import styles from "./TheCanvas.module.scss"
import { ResizeObserver } from '@juggle/resize-observer';

type TheCanvasProps = {
    showPerf?: boolean
}

const TheCanvas: FunctionComponent<TheCanvasProps> = ({showPerf = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'), ...props}) => {
    return (
        <div className={styles.TheCanvas}>
            <Canvas resize={{ polyfill: ResizeObserver }}  dpr={[window.devicePixelRatio, 2]}>
                {props.children}
                <ambientLight intensity={1}/>
                {showPerf && <Perf position={'bottom-right'}/>}
            </Canvas>
        </div>
    );
}

export default TheCanvas;
