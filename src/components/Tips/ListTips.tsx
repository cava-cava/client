import React, {FunctionComponent, useEffect} from 'react';
import styles from "./ListTips.module.scss";
import CardTips from "./CardTips";
import {Tip} from "../../store/tips/types";

type ListTipsProps = {
    tips: Tip[]
}

const ListTips: FunctionComponent<ListTipsProps> = ({tips}) => {
    return (
        <div className={styles.ListTips}>
            {tips.map((tip:Tip, index:number) => <CardTips key={index} message={tip.message}/>)}
        </div>)
}

export default ListTips;
