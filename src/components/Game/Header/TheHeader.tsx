import React, {FunctionComponent} from 'react';
import UserHeader from "./UserHeader";
import styles from  "./TheHeader.module.scss"
import HelpHeader from "./HelpHeader";
import SettingsHeader from "./SettingsHeader";
import codeBorder from '../../../assets/svg/codeBorder.svg'
import {User} from "../../../store/user/types";

type TheHeaderProps = {
    user: User,
    code: string
}

const TheHeader: FunctionComponent<TheHeaderProps> = ({user, code}) =>
        <header className={styles.TheHeader}>
            <UserHeader user={user} roomId={code}/>
            <div className={styles.codeContainer}>
            <img className={styles.border} src={codeBorder}/>
                <div className={styles.code}>{code}</div>
            </div>
            <HelpHeader />
            <SettingsHeader />
        </header>

export default TheHeader;
