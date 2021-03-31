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

    // Set up the interval.
    useEffect(() => {
        const TimerOn = () => {
            if (seconds > 0)
                setSeconds(seconds - 1)
            else return
        }

        if (seconds && seconds > 0) {
            const interval = setInterval(TimerOn, 1000);
            return () => clearInterval(interval);
        } else if(userKey === 0){
            // isHost
            socket.emit('endTimer', roomId, userKey)
        }
    }, [seconds]);


    useEffect(() => {
        const startTimer = (seconds: number) => {
            setSeconds(seconds)

            if (null !== countdownEl.current) {
                countdownEl.current.style.animationDuration = `${seconds}s`;
            }
        }

        socket.on("startTimer", startTimer)

        return () => {
            socket.off("startTimer", startTimer)
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
