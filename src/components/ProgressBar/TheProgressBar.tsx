import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from "./TheProgressBar.module.scss"
import UserProgressBar from "./UserProgressBar";
import {User} from "../../store/user/types";
import progressBar from "../../assets/svg/jauge.svg";

type TheProgressBarProps = {
    users: User[],
    user: User,
    playerKey?: number
}

const TheProgressBar: FunctionComponent<TheProgressBarProps> = ({users, user, playerKey}) => {
    const [activeKey, setActiveKey] = useState<number>(playerKey ? playerKey : -1)

    const onClick = () => {
        let index = activeKey
        if(++index >= users.length) setActiveKey(-1)
        else setActiveKey(index)
    }

    useEffect(() => {
        setActiveKey(playerKey ? playerKey : -1)
    }, [playerKey])

    return (
        <div className={styles.TheProgressBar} onClick={onClick}>
            <div>
                <img src={progressBar}/>
                <div className={styles.TheProgressBarValue}
                     style={{width: `${user.points}%`, backgroundColor: user.color}}/>
            </div>
            <div>
                {users.map((user, index) => <UserProgressBar user={user} activeKey={activeKey} key={index}/>)}
            </div>
        </div>
    )
}

export default TheProgressBar;
