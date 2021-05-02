import React, {FunctionComponent} from 'react';
import {createPortal} from "react-dom";
import styles from './TheModal.module.scss'
import TitleImg from "../TitleImg";
import IconClose from "../IconClose";

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
                            <TitleImg src={title}/>
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
