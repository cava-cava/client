import React, {FunctionComponent, ReactElement, useEffect, useRef, useState} from 'react';
import styles from './TheTimer.module.scss'
import {socket} from "../../socketClient";

type TheTimerProps = {
    userKey: number
    roomId: string
    children: ReactElement
}

const TheTimer: FunctionComponent<TheTimerProps> = ({userKey, roomId, children}) => {
    const [seconds, setSeconds] = useState(0)
    const countdownEl = useRef<SVGCircleElement>(null);

    useEffect(() => {
        const timer = (seconds: number) => {
            setSeconds(seconds)

            if (null !== countdownEl.current) {
                countdownEl.current.style.animationDuration = `${seconds}s`;
            }
        }

        socket.on("timer", timer)

        return () => {
            socket.off("timer", timer)
        }
    }, []);

    return (
        <div className={styles.TheTimer}>
            <div>{children}</div>
            {(seconds && seconds > 0) ? <svg><circle ref={countdownEl} r="22" cx="25" cy="25" /></svg> : null}
            {seconds}
        </div>
    )
}
export default TheTimer;
