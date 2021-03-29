import React, {FunctionComponent} from 'react';
import styles from './UserProgressBar.module.scss'
import avatar from '../../assets/png/avatar.png'


type UserProgressBarProps = {
    value: number
    color: string
}
const UserProgressBar: FunctionComponent<UserProgressBarProps> = ({value, color}) =>
    <div className={styles.UserProgressBar} style={{left: `${value}%`, backgroundColor: color}}>
        <img src={avatar} />
    </div>

export default UserProgressBar;
