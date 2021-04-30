import React, {FunctionComponent} from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import TitleImg from "./TitleImg";
import title from "../assets/title/saviez-vous.png"
import styles from './DidYouKnow.module.scss'
import useDidYouKnow from "../hooks/useDidYouKnow";
import {Know} from "../store/knows/types";

const DidYouKnow: FunctionComponent = () => {
    const knows:Know[] = useSelector((state: ApplicationState) => state.knows.data)
    useDidYouKnow();

    return (knows && knows[0]?.text) ? (
        <div className={styles.DidYouKnow}>
            <TitleImg src={title} />
            <p>{knows[0]?.text}</p>
        </div>
    ) : null
}

export default DidYouKnow;
