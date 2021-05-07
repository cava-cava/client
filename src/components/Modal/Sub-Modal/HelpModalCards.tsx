import React, {FunctionComponent} from 'react';
import styles from './HelpModalCards.module.scss'
import {RulesCards} from "../../../store/rules/types";

type HelpModalCardsProps = {
    cards: RulesCards[]
}

const HelpModalCards: FunctionComponent<HelpModalCardsProps> = ({cards}) => {

    return (
        <div className={styles.HelpModalCards}>
            <h2>Les cartes :</h2>
            {cards.map((card,index) =>
                <div key={index}>
                    {card.image?.url && <img src={card.image.url}/>}
                    <div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                </div> )}
        </div>
    )
}

export default HelpModalCards;
