import React from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Julien.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";

const Julien = () => {
    return (
    <div className={styles.Julien}>
        <TheHeader />
        <TheProgressBar />
    </div>
  );
}

export default Julien;
