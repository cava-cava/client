import React, {FunctionComponent} from 'react';
import styles from './UserProgressBar.module.scss'
import avatar from '../../assets/png/avatar.png'
import {User} from "../../store/user/types";


type UserProgressBarProps = {
    user: User,
    playerKey?: number
}
const UserProgressBar: FunctionComponent<UserProgressBarProps> = ({user, playerKey}) =>
    <div className={(playerKey && playerKey === user.key) ? (`${styles.UserProgressBar}  ${styles.UserProgressBarActive}`) : styles.UserProgressBar} style={{left: `${user.points}%`, backgroundColor: user.color}}>
        <img src={avatar} />
    </div>

export default UserProgressBar;
