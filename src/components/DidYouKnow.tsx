import React, {FunctionComponent} from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import TheTitle from "./TheTitle";
import styles from './DidYouKnow.module.scss'
import useDidYouKnow from "../hooks/useDidYouKnow";
import {Know} from "../store/knows/types";

const DidYouKnow: FunctionComponent = () => {
    const knows:Know[] = useSelector((state: ApplicationState) => state.knows.data)
    useDidYouKnow();

    return (knows && knows[0]?.text) ? (
        <div className={styles.DidYouKnow}>
            <TheTitle title={"Le Saviez-vous"} />
            <p>{knows[0]?.text}</p>
        </div>
    ) : null
}

export default DidYouKnow;
