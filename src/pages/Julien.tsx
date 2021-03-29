import React from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Julien.module.scss'
import TheGuess from "../components/Game/Guess/TheGuess";

const Julien = () => {
    return (
        <div className={styles.Julien}>
            <TheHeader username="JujuOneLove" code="XLRTZ"/>
            <TheGuess/>
        </div>
    );
}

export default Julien;
