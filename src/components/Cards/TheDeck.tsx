import React, {FunctionComponent} from 'react';
import styles from './TheDeck.module.scss'
import deck from './../../assets/png/deck3.png'
import {colors} from "../../mixins/color";
import {socket} from "../../socketClient";
import {User} from "../../store/user/types";

type TheDeckProps = {
    number: number,
    style: object
    roomId: string
    player?: User
    userKey: number
}

const TheDeck: FunctionComponent<TheDeckProps> = ({number, style, roomId, player, userKey}) => {
    const deskClick = () => {
        if(player && userKey === player.key) {
            console.color(`Tirer une carte`, colors.blue);
            socket.emit('deckClicked', roomId, player.key)
        } else {
            console.color(`Tu ne peux pas de tirer de carte`, colors.blue);
        }
    }

    return number > 0 ?
        (<div className={styles.TheDeck} onClick={deskClick} style={style}>
            <img src={deck}/>
        </div>) : null
}

export default TheDeck;
