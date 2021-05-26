import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import styles from './UserProgressBar.module.scss'
import {User} from "../../store/user/types";
import {CSSTransition} from "react-transition-group";


type UserProgressBarProps = {
    user: User,
    activeKey?: number
}
const UserProgressBar: FunctionComponent<UserProgressBarProps> = ({user, activeKey}) => {
    const [lastUserPoints, setLastUserPoints] = useState<number | undefined>(undefined)
    const [points, setPoints] = useState<number | undefined>(undefined)
    const [show, setShow] = useState<boolean>(false)
    const idRef = useRef<any>();

    useEffect(() => {
        if (lastUserPoints !== undefined && lastUserPoints !== user.points) {
            setShow(true)
            setPoints(user.points - lastUserPoints)
            setLastUserPoints(user.points)
            const id = setTimeout(() => {
                setShow(false);
            }, 1500);
            if (null !== idRef.current) {
                idRef.current = id;
            }
        } else if (lastUserPoints === undefined) {
            setLastUserPoints(user.points)
        }
        return () => {
            clearTimeout(idRef.current)
        };
    }, [user.points])

    return (
        <div
            className={((activeKey || activeKey === 0) && activeKey === user.key) ? (`${styles.UserProgressBar}  ${styles.UserProgressBarActive}`) : styles.UserProgressBar}
            style={{left: `${user.points}%`}}>
            <img src={`/smiley/${user.color.replace('#', '')}/smiley_${user.avatar}.png`}/>
            <CSSTransition
                in={show}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <div>{points}%</div>
            </CSSTransition>
        </div>
    )
}


export default UserProgressBar;
