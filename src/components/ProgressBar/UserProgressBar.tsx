import React, {FunctionComponent} from 'react';
import styles from './UserProgressBar.module.scss'
import {User} from "../../store/user/types";
import {CSSTransition} from "react-transition-group";

type UserProgressBarProps = {
    user: User,
    position: number,
    activeKey?: number
}
const UserProgressBar: FunctionComponent<UserProgressBarProps> = ({user, position, activeKey}) => {
    return (
        <div
            className={((activeKey || activeKey === 0) && activeKey === user.key) ? (`${styles.UserProgressBar}  ${styles.UserProgressBarActive}`) : styles.UserProgressBar}
            style={{left: `${user.points}%`}}>
            <img src={`/smiley/${user.color.replace('#', '')}/smiley_${user.avatar}.png`}/>
            <CSSTransition
                in={!!(user.progressBar && user.progressBar.length > 0)}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <div className={`${position % 2 === 0 ? styles.UserProgressBarTop : styles.UserProgressBarBottom}`}><span style={{color: user.color}}>{user.progressBar}</span></div>
            </CSSTransition>
        </div>
    )
}


export default UserProgressBar;
