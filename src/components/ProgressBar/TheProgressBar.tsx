import React, {FunctionComponent} from 'react';
import styles from  "./TheProgressBar.module.scss"
import UserProgressBar from "./UserProgressBar";
import {User} from "../../store/user/types";
import progressBar from "../../assets/svg/jauge.svg";

type TheProgressBarProps = {
    users: User[],
    user: User,
    playerKey?: number
}

const TheProgressBar: FunctionComponent<TheProgressBarProps> = ({users, user, playerKey}) =>
    <div className={styles.TheProgressBar}>
        <img src={progressBar} />
        <div className={styles.TheProgressBarValue} style={{width: `${user.points}%`, backgroundColor: user.color}}/>
        <div>
            {users.map((user, index) => <UserProgressBar user={user} playerKey={playerKey} key={index}/>)}
        </div>
    </div>

export default TheProgressBar;
