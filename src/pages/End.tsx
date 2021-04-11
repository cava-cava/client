import React from 'react';
import {Link} from "react-router-dom";
import styles from './End.module.scss'
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import UserHeader from "../components/Game/Header/UserHeader";
import EndMessages from "../components/GameOver/EndMessages";
import useLeaveRoom from "../hooks/useLeaveRoom";

const End = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);

    useLeaveRoom()

    return (
        <div className={styles.End}>
            <UserHeader user={user} roomId={''}/>
            <EndMessages gameOver={user.gameOver}/>
            <div className={styles.EndButtons}>
                <Link to="/rooms">Rejouez</Link>
                <Link to="/tips">Tips</Link>
            </div>
        </div>
    );
}

export default End;
