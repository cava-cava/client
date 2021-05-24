import React, {Suspense, useEffect, useState} from 'react';
import styles from './Test.module.scss'
import TheSprite from "../components/WebGl/TheSprite";
import TheCanvas from "../components/WebGl/TheCanvas";
import TheTitle from "../components/TheTitle";
import ThePlaneVideo from "../components/WebGl/ThePlaneVideo";
// @ts-ignore
import videoSrc from "../assets/mp4/test.mp4"
import * as dat from "dat.gui";

const Test = () => {
    const [omgWin, setOmgWin] = useState(false)
    const [select, setSelect] = useState("sprite")

    const parameters = {
        selects: select,
        omgWin: omgWin
    }

    useEffect(() => {
        const gui = new dat.GUI();
        gui.add(parameters, 'selects',{
            'sprite': 'sprite',
            'video': 'video'
        }).onChange(value => setSelect(value));
        gui.add(parameters, 'omgWin').onChange(value => setOmgWin(value));
        return () => {
            gui.destroy()
        }
    }, [])

    return (
        <div className={styles.Test}>
            <TheCanvas showPerf={true}>
                <Suspense fallback={null}>

                    {select === "sprite" &&
                    <TheSprite textureSrc={"https://i.imgur.com/Oj6RJV9.png"} args={[4, 4, 1]} position={[0, 0, 0]}
                               triggerAnimate={omgWin} onClick={() => setOmgWin(true)}/>}
                    {select === "video" &&
                    <ThePlaneVideo videoSrc={videoSrc} loop={false} currentTime={0.01} args={[3.3, 4]}
                                   position={[0, 0, 0]}
                                   triggerPlay={omgWin} onClick={() =>setOmgWin(true)}/>}
                </Suspense>
            </TheCanvas>
            <TheTitle title={omgWin ? "Win" : "Lose"}/>
        </div>
    );
}

export default Test;
