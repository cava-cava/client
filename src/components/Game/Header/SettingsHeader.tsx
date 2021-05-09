import React, {FunctionComponent} from 'react';
import styles from './SettingsHeader.module.scss'
import settingsIcon from '../../../assets/svg/settings.svg'
import useModal from "../../../hooks/useModal";
import SettingsModal from "../../Modal/SettingsModal";

const SettingsHeader: FunctionComponent = () => {
    const { isShowing: isSettingsShowed, toggle: toggleSettings } = useModal();

    return (
        <div className={styles.SettingsHeader}>
            <button role="button" className={styles.icon} onClick={toggleSettings}>
                <img src={settingsIcon}/>
            </button>
            <SettingsModal isShowing={isSettingsShowed} hide={toggleSettings}/>
        </div>
    )
}

export default SettingsHeader;
