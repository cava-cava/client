import React, {FunctionComponent} from 'react';
import styles from './TheBottomDeck.module.scss'

import cardPiocheCheh from "./../assets/png/carte_pioche_cheh.png";


type TheDeckProps = {
    number: number,
    color?: string,
    deskClick?: () => void,
    style?: object
    joker?: boolean
    assets?: string[]
}

const TheDeck: FunctionComponent<TheDeckProps> = ({number, color, deskClick, style, assets}) => {
    let cards: any = []

    // for (let i = 0; i < number; i++) {
    //     cards.push(            <img className={styles.Cheh} src={cardPiocheCheh}></img>)
    // }

    return number > 0 ?
        (<div className={styles.TheBottomDeck} onClick={deskClick} style={style}>
           {assets && <img className={styles.invertedCard} src={assets[1]}></img> }
           {assets && <img className={styles.actionCard} src={assets[0]}></img> }
        </div>) : null
}

export default TheDeck;
