import React, {FunctionComponent} from 'react';
import styles from './UserProgressBar.module.scss'
import {User} from "../../store/user/types";


type UserProgressBarProps = {
    user: User,
    activeKey?: number
}
const UserProgressBar: FunctionComponent<UserProgressBarProps> = ({user, activeKey}) =>
    <div className={((activeKey || activeKey === 0) && activeKey === user.key) ? (`${styles.UserProgressBar}  ${styles.UserProgressBarActive}`) : styles.UserProgressBar} style={{left: `${user.points}%`}}>
        <img src={`/smiley/${user.color.replace('#', '')}/smiley_${user.avatar}.png`}/>
    </div>

export default UserProgressBar;
