import React, {FunctionComponent} from 'react';
import UserHeader from "./UserHeader";
import styles from  "./TheHeader.module.scss"
import HelpHeader from "./HelpHeader";
import SettingsHeader from "./SettingsHeader";
import {User} from "../../../store/user/types";
import TimerGuess from "../Guess/TimerGuess";

type TheHeaderProps = {
    user: User,
    roomId: string,
    triggerGuesses: boolean
}

const TheHeader: FunctionComponent<TheHeaderProps> = ({user, roomId, triggerGuesses}) =>
        <header className={styles.TheHeader}>
            {!triggerGuesses && <UserHeader user={user} roomId={roomId}/>}
            {triggerGuesses && <TimerGuess />}
            <div>
                <HelpHeader />
                <SettingsHeader />
            </div>
        </header>

export default TheHeader;
