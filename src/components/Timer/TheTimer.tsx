import React, {FunctionComponent, ReactElement, useEffect, useRef, useState} from 'react';
import styles from './TheTimer.module.scss'
import useTimer from "../../hooks/useTimer";

type TheTimerProps = {
    color: string
    children: ReactElement
}

const TheTimer: FunctionComponent<TheTimerProps> = ({color, children}) => {
    const countdownEl = useRef<SVGCircleElement>(null);
    const seconds = useTimer()
    const [lastTimer, setLastTimer] = useState(0)
    const [showTimer, setShowTimer] = useState(true)

    useEffect(() => {
            console.log(seconds)
            if(seconds > (lastTimer + 1) || seconds < (lastTimer - 1)){
                setShowTimer(false)
                setTimeout(() => setShowTimer(true), 50)
            }
            setLastTimer(seconds)
    }, [seconds])

    return (
        <div className={styles.TheTimer}>
            <div>{children}</div>
            {(showTimer && seconds && seconds > 0) ? <svg><circle ref={countdownEl} r="29" cx="32" cy="35" stroke={color} /></svg> : null}
        </div>
    )
}
export default TheTimer;
