import React from 'react';
import styles from './Omg.module.scss'
import TheSprite from "../components/WebGl/TheSprite";
import TheCanvas from "../components/WebGl/TheCanvas";
import TheTitle from "../components/TheTitle";
import {useControls} from "leva";

const Omg = () => {
    const [{ omgWin }, set] = useControls(() => ({ omgWin: false }))

    return (
        <div className={styles.Omg}>
            <TheCanvas showPerf={true}>
                <TheSprite textureSrc={"https://i.imgur.com/Oj6RJV9.png"} args={[2, 2, 1]} position={[0, 0, 0]}
                           triggerAnimate={omgWin} onClick={() => set({ omgWin: true })}/>
            </TheCanvas>
            <TheTitle title={omgWin ? "Win" : "Lose"}/>
        </div>
    );
}

export default Omg;
