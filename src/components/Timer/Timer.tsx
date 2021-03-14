import React, {FunctionComponent, useEffect, useState} from 'react';
import useInterval from '../../hooks/useInterval'

type TimerProps = {
    message?: string
}
const Timer: FunctionComponent<TimerProps> = ({message}) => {
    const [seconds, setSeconds] = useState(15)

    const TimerOn = () => {
        if(seconds !== 0)
            setSeconds(seconds - 1)
        else 
            return
    }

  useInterval(() => {
    TimerOn()
  }, 1000);

    return (<div className='timer'>{seconds}</div>)
}
export default Timer;
