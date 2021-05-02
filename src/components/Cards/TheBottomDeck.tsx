import React, {FunctionComponent} from 'react';
import styles from './TheBottomDeck.module.scss'

type TheBottomDeckProps = {
    number: number,
    deskClick?: () => void,
    style?: object
    assets?: string[]
}

const TheBottomDeck: FunctionComponent<TheBottomDeckProps> = ({number, deskClick, style, assets}) => {
    return number > 0 ?
        (<div className={styles.TheBottomDeck} onClick={deskClick} style={style}>
           {assets && <img src={assets[1]} /> }
            <div>
                {assets && <img src={assets[0]} /> }
                <div>{number}</div>
            </div>
        </div>) : null
}

export default TheBottomDeck;
