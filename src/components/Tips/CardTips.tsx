import React, {FunctionComponent} from 'react';
import styles from "./CardTips.module.scss"

type CardTipsProps = {
    message?: string
}
const CardTips: FunctionComponent<CardTipsProps> = ({message}) => {
    return (<div className={styles.CardTips}>{message}</div>)
}
export default CardTips;
