import React, {FunctionComponent} from 'react';
import styles from './OhMyGod.module.scss'
import {socket} from "../../socketClient";
import TheBooty from "./TheBooty";
import useRoundEvent from "../../hooks/useRoundEvent";
import TitleImg from "../TitleImg";
import title from '../../assets/title/omg.png'
import click from '../../assets/svg/appuyer.svg'
import illustration from '../../assets/png/illuOMG.png'

type OhMyGodProps = {
    roomId: string,
    userKey: number
}

const OhMyGod: FunctionComponent<OhMyGodProps> = ({roomId, userKey}) => {
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
            <TheBooty win={win} lose={lose} roomId={roomId} userKey={userKey} />
        </div>
    )
}

export default OhMyGod;
