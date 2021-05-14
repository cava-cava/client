import React, {FunctionComponent} from 'react';
import {createPortal} from "react-dom";
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
        ? createPortal(
        <>
            <div className={styles.TheModal}>
                <div>
                    <div>
                        <div className={styles.TheModalHeader}>
                            <TheTitle title={title}/>
                            <button type="button" onClick={hide}><IconClose/></button>
                        </div>
                        <div className={styles.TheModalBody}>{props.children}</div>
                    </div>
                </div>
            </div>
        </>,
        document.body
        )
        : null;

export default TheModal;
