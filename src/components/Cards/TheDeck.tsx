import React, {FunctionComponent} from 'react';
import styles from './TheDeck.module.scss'

import deck from './../../assets/png/deck3.png'

type TheDeckProps = {
    number: number,
    color?: string,
    deskClick: () => void,
    style: object
    joker?: boolean
}

const TheDeck: FunctionComponent<TheDeckProps> = ({number, color, deskClick, style}) => {
    let cards: any = []

    for (let i = 0; i < number; i++) {
        cards.push(<div className={styles.card} style={{backgroundColor: color, top: (i * 10)+'px'}} key={i}></div>)
    }

    return number > 0 ?
        (<div className={styles.TheDeck} onClick={deskClick} style={style}>
            <img className={styles.deck} src={deck}/>
        </div>) : null
}

export default TheDeck;
