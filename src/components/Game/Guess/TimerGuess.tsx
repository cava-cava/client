import React, {FunctionComponent} from 'react';
import useTimer from "../../../hooks/useTimer";
import chrono from "../../../assets/svg/chrono.svg"
import styles from "./TimerGuess.module.scss"
const TimerGuess: FunctionComponent = () => {
    const seconds = useTimer()

    return (
        <div className={styles.TimerGuess}>
            <img src={chrono}/>
            <span>00:{`${seconds < 10 ? '0' : ''}${seconds}`}</span>
        </div>
    )
}

export default TimerGuess;
