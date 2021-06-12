import React, {FunctionComponent} from 'react';
import styles from './TheModal.module.scss'
import IconClose from "../IconClose";
import TheTitle from "../TheTitle";

type TheModalProps = {
    isShowing: boolean
    hide: () => void
    title: string
}

const TheModal: FunctionComponent<TheModalProps> = ({isShowing, hide, title, ...props}) =>
    isShowing
        ? (<div className={styles.TheModal}>
                <div>
                    <div className={styles.TheModalHeader}>
                        <TheTitle title={title}/>
                        <button type="button" onClick={hide}><IconClose/></button>
                    </div>
                    <div className={styles.TheModalBody}>{props.children}</div>
                </div>
            </div>
        ) : null;

export default TheModal;
