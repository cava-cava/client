import React, {FunctionComponent} from 'react';
import styles from './UserHeader.module.scss'
import avatar from '../../../assets/png/avatar.png'
import TheTimer from "../../Timer/TheTimer";
import {User} from "../../../store/user/types";
import borderAvatar from "../../../assets/svg/icone_perso.svg";

type UserHeaderProps = {
    user: User,
    roomId: string
}

const UserHeader: FunctionComponent<UserHeaderProps> = ({user, roomId}) => {
    const style = {backgroundColor: user.color, borderColor: user.color}
    return (
        <div className={styles.UserHeader}>
            <img src={borderAvatar} className={styles.borderAvatar} />
            <div className={styles.avatar} >
                <TheTimer userKey={user.key} roomId={roomId}>
                    <img src={`/smiley/${user.color.replace('#', '')}/smiley_${user.avatar}.png`}/>
                </TheTimer>
            </div>
            <div className={styles.user} >
                <div>{user.name}</div>
                <div>{user.ladder === 1 ?  `${user.ladder}er`: `${user.ladder}eme`}</div>
            </div>
        </div>
    )
}

export default UserHeader;
