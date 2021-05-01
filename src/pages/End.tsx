import React from 'react';
import {Link} from "react-router-dom";
import styles from './End.module.scss'
import stylesButton from '../components/TheButton.module.scss'
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import EndMessages from "../components/GameOver/EndMessages";
import useLeaveRoom from "../hooks/useLeaveRoom";
import AvatarHeader from "../components/Avatar/AvatarHeader";

const End = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);

    useLeaveRoom()

    return (
        <div className={styles.End}>
            <div>
                <AvatarHeader color={user.color} avatarNumber={user.avatar} />
                <EndMessages gameOver={user.gameOver}/>
                <div className={styles.EndButtons}>
                    <Link to="/rooms" className={stylesButton.TheButton}>Rejouez</Link>
                    <Link to="/tips" className={stylesButton.TheButton}>Tips</Link>
                </div>
            </div>
        </div>
    );
}

export default End;
