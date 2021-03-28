import React, {FunctionComponent} from 'react';
import styles from './TheBooty.module.scss'
import {colors} from "../../mixins/color";

type TheBootyProps = {
    showHappiness?: boolean
}

const TheBooty: FunctionComponent<TheBootyProps> = ({showHappiness = true}) => {
    const happinessClick = () => {
        console.color(`+3% bonheur`, colors.blue);
    }

    const jokerClick = () => {
        console.color(`1 carte joker`, colors.green);
    }

    const dirtClick = () => {
        console.color(`1 carte crasse`, colors.red);
    }

    return (
        <div className={styles.TheBooty}>
            <p>
                Bravo ! Tu as gagné !<br/>
                Tu peux choisir ta récompense.
            </p>
            <div className={styles.TheBootyButtons}>
                {showHappiness && <button role="button" onClick={happinessClick}>+3% de bonheur</button>}
                <button role="button" onClick={jokerClick}>1 carte Oh ça va</button>
                <button role="button" onClick={dirtClick}>1 carte Cheh</button>
            </div>
        </div>
    )
}

export default TheBooty;
