import React, {FunctionComponent} from 'react';
import styles from './SettingsHeader.module.scss'
import settingsIcon from '../../../assets/svg/settings.svg'
import useModal from "../../../hooks/useModal";
import TheModal from "../../Modal/TheModal";
import title from "../../../assets/title/parametres.png"

const SettingsHeader: FunctionComponent = () => {
    const { isShowing: isSettingsShowed, toggle: toggleSettings } = useModal();

    return (
        <div className={styles.SettingsHeader}>
            <button role="button" className={styles.icon} onClick={toggleSettings}>
                <img src={settingsIcon}/>
            </button>
            <TheModal
                isShowing={isSettingsShowed}
                hide={toggleSettings}
                title={title}
            >
                En cours de développement ...
            </TheModal>
        </div>
    )
}

export default SettingsHeader;
