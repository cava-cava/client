import React, {FunctionComponent} from 'react';
import UserHeader from "./UserHeader";
import styles from  "./TheHeader.module.scss"
import HelpHeader from "./HelpHeader";
import SettingsHeader from "./SettingsHeader";
import {User} from "../../../store/user/types";

type TheHeaderProps = {
    user: User,
    code: string
}

const TheHeader: FunctionComponent<TheHeaderProps> = ({user, code}) =>
        <header className={styles.TheHeader}>
            <UserHeader user={user} roomId={code}/>
            <div>
                <HelpHeader />
                <SettingsHeader />
            </div>
        </header>

export default TheHeader;
