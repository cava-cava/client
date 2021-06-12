import React, {FunctionComponent} from 'react';
import {ArrowProps} from "./ArrowProps";
import styles from "./Arrow.module.scss";


const RightArrow: FunctionComponent<ArrowProps> = ({onClick, classname}) => {
    return (
        <button className={`${styles.Arrow} ${styles.ArrowRight} ${classname}`} onClick={onClick}/>
    )
}

export default RightArrow;
