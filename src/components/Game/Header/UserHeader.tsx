import React, {FunctionComponent} from 'react';
import styles from './UserHeader.module.scss'
import avatar from '../../../assets/png/avatar.png'
import TheTimer from "../../Timer/TheTimer";

type UserHeaderProps = {
    username: string
}

const UserHeader: FunctionComponent<UserHeaderProps> = ({username}) =>
    <div className={styles.UserHeader}>
        <div className={styles.avatar}>
            <TheTimer>
                <img src={avatar}/>
            </TheTimer>
        </div>
        <div className={styles.user}>
            <div>{username}</div>
            <div>1er</div>
        </div>
    </div>

export default UserHeader;
