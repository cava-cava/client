import React, {FunctionComponent} from 'react';
import styles from "./ListTips.module.scss";
import {Tip} from "../../store/tips/types";

type ListTipsProps = {
    tips: Tip[]
}

const ListTips: FunctionComponent<ListTipsProps> = ({tips}) => {
    return (
        <div className={styles.ListTips}>
            {tips.map((tip:Tip, index:number) => <div key={index}>{tip.message}</div>)}
        </div>)
}

export default ListTips;
