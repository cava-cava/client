import React from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Julien.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";
import TheDeck from "../components/Cards/TheDeck";
import {colors} from "../mixins/color";

const Julien = () => {
    const drawClick = () => {
        console.color(`Tirer une carte`, colors.blue);
    }

    const jokerClick = () => {
        console.color(`joker`, colors.green);
    }

    const dirtClick = () => {
        console.color(`crasse`, colors.red);
    }
    return (
        <div className={styles.Julien}>
            <TheHeader username="JujuOneLove" code="XLRTZ"/>
            <TheProgressBar/>
            <div className={styles.JulienCenter}><TheDeck number={5} deskClick={drawClick}/></div>
            <div className={styles.JulienBottom}>
                <TheDeck number={2} color='green' deskClick={jokerClick}/>
                <TheDeck number={2} color='red' deskClick={dirtClick}/>
            </div>
        </div>
    );
}

export default Julien;
