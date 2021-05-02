import React, {FunctionComponent} from 'react';
import styles from './UserProgressBar.module.scss'
import {User} from "../../store/user/types";


type UserProgressBarProps = {
    user: User,
    playerKey?: number
}
const UserProgressBar: FunctionComponent<UserProgressBarProps> = ({user, playerKey}) =>
    <div className={(playerKey && playerKey === user.key) ? (`${styles.UserProgressBar}  ${styles.UserProgressBarActive}`) : styles.UserProgressBar} style={{left: `${user.points}%`}}>
        <img src={`/smiley/${user.color.replace('#', '')}/smiley_${user.avatar}.png`}/>
    </div>

export default UserProgressBar;
