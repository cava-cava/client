import React, {FunctionComponent} from 'react';
import styles from './UserHeader.module.scss'
import avatar from '../../../assets/png/avatar.png'
import TheTimer from "../../Timer/TheTimer";
import {User} from "../../../store/user/types";

type UserHeaderProps = {
    user: User,
    roomId: string
}

const UserHeader: FunctionComponent<UserHeaderProps> = ({user, roomId}) => {
    return (
        <div className={styles.UserHeader}>
            <div className={styles.avatar}>
                <TheTimer userKey={user.key} roomId={roomId}>
                    <img src={avatar}/>
                </TheTimer>
            </div>
            <div className={styles.user}>
                <div>{user.name}</div>
                <div>1er</div>
            </div>
        </div>
    )
}

export default UserHeader;
