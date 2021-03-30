import React, {FunctionComponent, ReactElement, useEffect, useRef, useState} from 'react';
import useInterval from '../../hooks/useInterval'
import styles from './TheTimer.module.scss'
import {colors} from "../../mixins/color";
import {socket} from "../../socketClient";

type TheTimerProps = {
    children: ReactElement
}

const TheTimer: FunctionComponent<TheTimerProps> = ({children}) => {
    const [seconds, setSeconds] = useState(0)
    const countdownEl = useRef<SVGCircleElement>(null);

    const TimerOn = () => {
        if (seconds !== 0)
            setSeconds(seconds - 1)
        else
            return
    }

    useInterval(() => {
        TimerOn()
    }, 1000);

    useEffect(() => {
        const startTimer = (seconds: number) => {
            setSeconds(seconds)
        }

        socket.on("startTimer", startTimer)

        return () => {
            socket.off("startTimer", startTimer)
        }
    }, []);

    useEffect(() => {
        if (seconds > 0 && null !== countdownEl.current) {
            countdownEl.current.style.animationDuration = `${seconds}s`;
        }
    }, [seconds]);

    return (
        <div className={styles.TheTimer}>
            <div>{children}</div>
            {seconds > 0 && <svg><circle ref={countdownEl} r="22" cx="25" cy="25" /></svg>}
        </div>
    )
}
export default TheTimer;
