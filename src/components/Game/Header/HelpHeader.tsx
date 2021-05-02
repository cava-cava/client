import React, {FunctionComponent} from 'react';
import styles from './HelpHeader.module.scss'
import helpIcon from '../../../assets/svg/information.svg'
import useModal from "../../../hooks/useModal";
import HelpModal from "../../Modal/HelpModal";

const HelpHeader: FunctionComponent = () => {
    const { isShowing: isHelpShowed, toggle: toggleHelp } = useModal();

    return (
        <div className={styles.HelpHeader}>
            <button role="button" className={styles.icon} onClick={toggleHelp}>
                <img src={helpIcon}/>
            </button>
            <HelpModal isShowing={isHelpShowed} hide={toggleHelp} />
        </div>
    )
}

export default HelpHeader;
