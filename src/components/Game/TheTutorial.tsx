import React, {FunctionComponent} from 'react';
import TheTitle from "../TheTitle";
import IconClose from "../IconClose";
import {socket} from "../../socketClient";
import styles from "./TheTutorial.module.scss"
import SliderTutorial from "./Tutorial/SliderTutorial";

type TheTutorialProps = {
    roomId: string,
    userKey: number
}

const TheTutorial: FunctionComponent<TheTutorialProps> = ({roomId, userKey}) => {
    const onClick = () => {
        socket.emit("isReady", roomId, userKey)
    }

    return(
        <div className={styles.TheTutorial}>
            <div>
                <TheTitle title={"Tuto"}/>
                <SliderTutorial/>
            </div>
            <button onClick={onClick}><IconClose/></button>
        </div>
    )
}

export default TheTutorial;
