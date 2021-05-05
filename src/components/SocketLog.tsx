import React, {FunctionComponent} from 'react';
import styles from './SocketLog.module.scss'
import {socket} from "../socketClient";

type SocketLogProps = {
    roomId: string
}

const SocketLog: FunctionComponent<SocketLogProps> = ({roomId}) => {
    return ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development')) ? (
        <div className={styles.SocketLog}>
            <button onClick={() => {socket.emit('startTimer', roomId)}}>Start Timer</button>
            <button onClick={() => {socket.emit('stopTimer', roomId)}}>Stop Timer</button>
        </div>
    ) : null
}

export default SocketLog;
