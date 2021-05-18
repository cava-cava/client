import React, {FunctionComponent} from 'react';
import styles from './SocketLog.module.scss'
import {socket} from "../socketClient";

type SocketLogProps = {
    roomId: string
    userKey: number
}

const SocketLog: FunctionComponent<SocketLogProps> = ({roomId, userKey}) => {
    return ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development')) ? (
        <div className={styles.SocketLog}>
            <button onClick={() => {socket.emit('sendPointsUser', roomId, userKey, 100)}}>Finish Winner Game</button>
            <button onClick={() => {socket.emit('startTimer', roomId)}}>Start Timer</button>
            <button onClick={() => {socket.emit('stopTimer', roomId)}}>Stop Timer</button>
        </div>
    ) : null
}

export default SocketLog;
