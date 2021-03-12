import React, {FunctionComponent} from 'react';
import UserHeader from "./UserHeader";
import styles from  "./TheHeader.module.scss"
import HelpHeader from "./HelpHeader";
import SettingsHeader from "./SettingsHeader";

const TheHeader: FunctionComponent = () =>
        <header className={styles.TheHeader}>
            <UserHeader />
            <div className={styles.code}>XLRTZ</div>
            <HelpHeader />
            <SettingsHeader />
        </header>

export default TheHeader;
