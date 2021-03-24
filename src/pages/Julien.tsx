import React from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Julien.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";
import TheDeck from "../components/Cards/TheDeck";

const Julien = () => {
    return (
        <div className={styles.Julien}>
            <TheHeader username="JujuOneLove" code="XLRTZ"/>
            <TheProgressBar/>
            <TheDeck/>
        </div>
    );
}

export default Julien;
