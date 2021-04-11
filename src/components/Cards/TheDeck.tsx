import React, {FunctionComponent} from 'react';
import styles from './TheDeck.module.scss'

type TheDeckProps = {
    number: number,
    color?: string,
    deskClick: () => void,
    style: object
}

const TheDeck: FunctionComponent<TheDeckProps> = ({number, color, deskClick, style}) => {
    let cards: any = []

    for (let i = 0; i < number; i++) {
        cards.push(<div className="card" style={{backgroundColor: color, top: (i * 10)+'px'}} key={i}></div>)
    }

    return number > 0 ?
        (<div className={styles.TheDeck} onClick={deskClick} style={style}>
            {cards}
        </div>) : null
}

export default TheDeck;
