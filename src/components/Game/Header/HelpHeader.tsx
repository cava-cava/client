import React, {FunctionComponent} from 'react';
import styles from './HelpHeader.module.scss'
import helpIcon from '../../../assets/svg/information.svg'
import useModal from "../../../hooks/useModal";
import TheModal from "../../Modal/TheModal";

const HelpHeader: FunctionComponent = () => {
    const { isShowing: isHelpShowed, toggle: toggleHelp } = useModal();

    return (
        <div className={styles.HelpHeader}>
            <button role="button" className={styles.icon} onClick={() => toggleHelp}>
                <img src={helpIcon}/>
            </button>
            <TheModal
                isShowing={isHelpShowed}
                hide={toggleHelp}
                title="Règles du jeu"
            >
                Ici c'est les règles du jeu
            </TheModal>
        </div>
    )
}

export default HelpHeader;
