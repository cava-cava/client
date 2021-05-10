import React from 'react';
import {Link} from "react-router-dom";
import styles from './End.module.scss'
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import EndMessages from "../components/GameOver/EndMessages";
import useLeaveRoom from "../hooks/useLeaveRoom";
import useGameOverMessages from "../hooks/useGameOverMessages";

const End = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);

    useLeaveRoom()
    useGameOverMessages()

    return (
        <div className={styles.End}>
            <EndMessages gameOver={user.gameOver.length > 0 ? user.gameOver : ['default']}/>
            <div className={styles.EndButtons}>
                <Link to="/rooms">Rejouez</Link>
                <Link to="/tips">Tips</Link>
            </div>
        </div>
    );
}

export default End;
