import React, {FunctionComponent} from 'react';
import styles from './UserHeader.module.scss'
import avatar from '../../../assets/png/avatar.png'

const UserHeader: FunctionComponent = () =>
    <div className={styles.UserHeader}>
        <div className={styles.avatar}>
            <img src={avatar}/>
        </div>
        <div className={styles.user}>
            <div>JujuOneLove</div>
            <div>1er</div>
        </div>
    </div>

export default UserHeader;
