import React from 'react';
import styles from './Omg.module.scss'
import TheSprite from "../components/WebGl/TheSprite";
import TheCanvas from "../components/WebGl/TheCanvas";
import TheTitle from "../components/TheTitle";
import {useControls} from "leva";
import ThePlaneVideo from "../components/WebGl/ThePlaneVideo";
// @ts-ignore
import videoSrc from "../assets/test.mp4"

const Omg = () => {
    const selects = useControls({
        mesh: { options: { Sprite: "sprite", Video: "video" } },
    })
    const [{ omgWin }, set] = useControls(() => ({ omgWin: false }))

    return (
        <div className={styles.Omg}>
            <TheCanvas showPerf={true}>
                {selects.mesh === "sprite" && <TheSprite textureSrc={"https://i.imgur.com/Oj6RJV9.png"} args={[4, 4, 1]} position={[0, 0, 0]}
                                                         triggerAnimate={omgWin} onClick={() => set({ omgWin: true })}/>}
                {selects.mesh === "video" && <ThePlaneVideo videoSrc={videoSrc} loop={false} currentTime={0.01} args={[3.3,4]} position={[0, 0, 0]}
                                                         triggerPlay={omgWin} onClick={() => set({ omgWin: true })}/>}
            </TheCanvas>
            <TheTitle title={omgWin ? "Win" : "Lose"}/>
        </div>
    );
}

export default Omg;
