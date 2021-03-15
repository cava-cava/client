import React from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Julien.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";
import OhMyGod from "../components/Game/OhMyGod";

const Julien = () => {
    return (
        <div className={styles.Julien}>
            <TheHeader/>
            <TheProgressBar/>
            <OhMyGod/>
        </div>
    );
}

export default Julien;
