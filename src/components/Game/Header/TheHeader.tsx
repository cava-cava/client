import React, {FunctionComponent} from 'react';
import UserHeader from "./UserHeader";
import styles from  "./TheHeader.module.scss"
import HelpHeader from "./HelpHeader";
import SettingsHeader from "./SettingsHeader";

type TheHeaderProps = {
    username: string,
    code: string
}

const TheHeader: FunctionComponent<TheHeaderProps> = ({username, code}) =>
        <header className={styles.TheHeader}>
            <UserHeader username={username}/>
            <div className={styles.code}>{code}</div>
            <HelpHeader />
            <SettingsHeader />
        </header>

export default TheHeader;
