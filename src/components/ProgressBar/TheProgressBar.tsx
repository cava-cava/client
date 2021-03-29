import React, {FunctionComponent} from 'react';
import styles from  "./TheProgressBar.module.scss"
import UserProgressBar from "./UserProgressBar";
import {User} from "../../store/user/types";

type TheProgressBarProps = {
    users: User[],
    userPoints: number
}

const TheProgressBar: FunctionComponent<TheProgressBarProps> = ({users, userPoints}) =>
    <div className={styles.TheProgressBar}>
        <div className={styles.TheProgressBarValue} style={{width: `${userPoints}%`}}/>
        <div>
            {users.map((user, index) => <UserProgressBar value={user.points} color={user.color} key={index}/>)}
        </div>
    </div>

export default TheProgressBar;
