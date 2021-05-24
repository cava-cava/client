import React, {useEffect, useRef, useState} from 'react';
import TheTitle from "../components/TheTitle";
import InteractionOmg from "../components/Game/Omg/InteractionOmg";
import * as dat from 'dat.gui';
import InputFile from "../components/gui/InputFile";
import styles from './Omg.module.scss'

const Omg = () => {
    const myInputBefore = useRef<any>()
    const myInputAfter = useRef<any>()
    const [omgWin, setOmgWin] = useState(false)
    const [type, setType] = useState("click")
    const [animationBefore, setAnimationBefore] = useState("")
    const [animationAfter, setAnimationAfter] = useState("")

    const parameters = {
        type: type,
        loadBefore: () => {
            if (null !== myInputBefore.current) {
                myInputBefore.current.click();
            }
        },
        loadAfter: () => {
            if (null !== myInputAfter.current) {
                myInputAfter.current.click();
            }
        },
        reset: () => {
            setActive(false)
        }
    }

    const setActive = (value: boolean) => {
        setOmgWin(value)
    }

    useEffect(() => {
        const gui = new dat.GUI();
        gui.add(parameters, 'loadBefore').name('Load animation before interaction');
        gui.add(parameters, 'loadAfter').name('Load animation after interaction');
        gui.add(parameters, 'type', {
            'click': 'click',
            'swipe': 'swipe'
        }).onChange(value => setType(value));
        gui.add(parameters, 'reset').name('Reset');
        return () => {
            gui.destroy()
        }
    }, [])

    return (
        <div className={styles.Omg}>
            <TheTitle title={omgWin ? "Win" : "Lose"}/>
            <InteractionOmg type={type} active={omgWin} setActive={setActive} animationBefore={animationBefore}
                            animationAfter={animationAfter}/>
            <InputFile refs={myInputBefore} setValue={setAnimationBefore}/>
            <InputFile refs={myInputAfter} setValue={setAnimationAfter}/>
        </div>
    );
}

export default Omg;
