import React, {FunctionComponent} from 'react';
import {createPortal} from "react-dom";
import styles from './TheModal.module.scss'

type TheModalProps = {
    isShowing: boolean,
    hide: () => void,
    title: string
}

const TheModal: FunctionComponent<TheModalProps> = ({isShowing, hide, title, ...props}) =>
    isShowing
        ? createPortal(
        <>
            <div className={styles.TheModal}>
                <div>
                    <div className={styles.TheModalHeader}>
                        <h3>{title}</h3>
                        <button
                            type="button"
                            onClick={hide}
                        >
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className={styles.TheModalBody}>{props.children}</div>
                </div>
            </div>
        </>,
        document.body
        )
        : null;

export default TheModal;
