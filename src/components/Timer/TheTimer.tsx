import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import useInterval from '../../hooks/useInterval'
import styles from './TheTimer.module.scss'

type TheTimerProps = {
    message?: string
}

const TheTimer: FunctionComponent<TheTimerProps> = ({message, ...props}) => {
    const [seconds, setSeconds] = useState(15)
    const countdownEl = useRef<SVGCircleElement>(null);

    const TimerOn = () => {
        if (seconds !== 0)
            setSeconds(seconds - 1)
        else
            return
    }

    useEffect(() => {
        if (null !== countdownEl.current) {
            countdownEl.current.style.animationDuration = `${seconds}s`;
        }
    }, []);

    useInterval(() => {
        TimerOn()
    }, 1000);

    return (
        <div className={styles.TheTimer}>
            <div>{props.children}</div>
            <svg>
                <circle ref={countdownEl} r="22" cx="25" cy="25" />
            </svg>
        </div>
    )
}
export default TheTimer;
