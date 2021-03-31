import React, {FunctionComponent} from 'react';
import styles from './TheCards.module.scss'

type TheCardsProps = {
    Description: string
}

const TheCards: FunctionComponent<TheCardsProps> = ({Description}) => {

    return (
        <div className={styles.TheCards}>
            {Description}
        </div>
    )
}

export default TheCards;
