import React from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Game.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";

const Game = () => {
    return (
        <div className={styles.Game}>
            <TheHeader/>
            <TheProgressBar/>
        </div>
    );
}

export default Game;
