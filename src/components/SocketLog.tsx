import React, {FunctionComponent} from 'react';
import styles from './SocketLog.module.scss'
import {socket} from "../socketClient";

const SocketLog: FunctionComponent = () => {
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? (
        <div className={styles.SocketLog}>
            <button onClick={() => {socket.emit('logMySocket')}}>Get My Socket Log</button>
            <button onClick={() => {socket.emit('logRooms')}}>Get Rooms Log</button>
        </div>
    ) : null
}

export default SocketLog;
