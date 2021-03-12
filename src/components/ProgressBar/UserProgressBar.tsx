import React, {FunctionComponent} from 'react';
import styles from './UserProgressBar.module.scss'
import avatar from '../../assets/png/avatar.png'


type UserProgressBarProps = {
    value: number
}
const UserProgressBar: FunctionComponent<UserProgressBarProps> = ({value}) =>
    <div className={styles.UserProgressBar} style={{left: `${value}%`}}>
        <img src={avatar} />
    </div>

export default UserProgressBar;
