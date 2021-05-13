import React, {FunctionComponent} from 'react';
import styles from './OhMyGod.module.scss'
import {socket} from "../../socketClient";
import TheBooty from "./TheBooty";
import useRoundEvent from "../../hooks/useRoundEvent";
import TitleImg from "../TitleImg";
import title from '../../assets/title/omg.png'
import click from '../../assets/svg/appuyer.svg'
import illustration from '../../assets/png/illuOMG.png'
import {User} from "../../store/user/types";

type OhMyGodProps = {
    roomId: string,
    userKey: number,
    users: User[]
}

const OhMyGod: FunctionComponent<OhMyGodProps> = ({roomId, userKey, users}) => {
    const { win, lose } = useRoundEvent(roomId, userKey);

    const handleClick = () => {
        socket.emit('winRoundEvent', roomId, userKey)
    }

    return (
        <div className={styles.OhMyGod}>
            <TitleImg src={title}/>
            { (!win && !lose) &&
            <div className={styles.OhMyGodInteraction}>
                <button role="button" onClick={handleClick}>
                    <img src={illustration}/>
                    <div>
                        <img src={click}/>
                        <span>Appuyer</span>
                    </div>
                </button>
            </div>
            }
            {lose && <p>Tu as perdu...</p>}
            <TheBooty win={win} lose={lose} roomId={roomId} userKey={userKey} users={users.filter(user => user.winEvent)}/>
        </div>
    )
}

export default OhMyGod;
