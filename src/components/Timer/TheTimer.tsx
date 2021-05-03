import React, {FunctionComponent, ReactElement, useRef} from 'react';
import styles from './TheTimer.module.scss'
import useTimer from "../../hooks/useTimer";

type TheTimerProps = {
    userKey: number
    roomId: string
    children: ReactElement
}

const TheTimer: FunctionComponent<TheTimerProps> = ({userKey, roomId, children}) => {
    const countdownEl = useRef<SVGCircleElement>(null);
    const seconds = useTimer()

    return (
        <div className={styles.TheTimer}>
            <div>{children}</div>
            {(seconds && seconds > 0) ? <svg><circle ref={countdownEl} r="29" cx="32" cy="35" /></svg> : null}
        </div>
    )
}
export default TheTimer;
