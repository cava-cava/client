import React, {FunctionComponent} from 'react';
import styles from './TheDeck.module.scss'
import {colors} from "../../mixins/color";

const TheDeck: FunctionComponent = () => {
    let cards: any = []
    for (let i = 0; i < 10; i++) {
        cards[i] = i
    }

    const deskClick = () => {
        console.color(`Tirer une carte`, colors.blue);
    }

    return (
        <div className={styles.TheDeck} onClick={deskClick}>
            {cards.map(() => <div></div>)}
        </div>
    )
}

export default TheDeck;
