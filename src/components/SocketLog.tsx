import React, {FunctionComponent} from 'react';
import styles from './SocketLog.module.scss'
import {socket} from "../socketClient";

const SocketLog: FunctionComponent = () => {
    return (
            <button className={styles.SocketLog} onClick={() => {socket.emit('log')}}>Get Socket Log</button>
    )
}

export default SocketLog;
