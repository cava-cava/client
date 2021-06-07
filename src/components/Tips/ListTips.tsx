import React, {FunctionComponent} from 'react';
import styles from "./ListTips.module.scss";
import {Tip} from "../../store/tips/types";
import MessageTips from "./MessageTips";

type ListTipsProps = {
    tips: Tip[]
}

const ListTips: FunctionComponent<ListTipsProps> = ({tips}) => {
    return (
        <div className={styles.ListTips}>
            {tips.length === 0 ? <div>Chargement...</div> : tips.map((tip:Tip, index:number) => <MessageTips key={index} index={index} message={tip.message} date={tip.published_at}/>)}
        </div>)
}

export default ListTips;
