import React, {FunctionComponent} from 'react';
import styles from  "./TheProgressBar.module.scss"
import UserProgressBar from "./UserProgressBar";

const TheProgressBar: FunctionComponent = () =>
    <div className={styles.TheProgressBar}>
        <div className={styles.TheProgressBarValue} style={{width: `${39}%`}}/>
        <div>
            <UserProgressBar  value={18}/>
            <UserProgressBar value={39}/>
            <UserProgressBar value={87}/>
        </div>
    </div>

export default TheProgressBar;
