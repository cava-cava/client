import React from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Julien.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";
import TheBooty from "../components/Game/TheBooty";

const Julien = () => {
    return (
        <div className={styles.Julien}>
            <TheHeader username="JujuOneLove" code="XLRTZ"/>
            <TheProgressBar/>
            <TheBooty />
        </div>
    );
}

export default Julien;
