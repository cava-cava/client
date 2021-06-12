import React, {FunctionComponent} from 'react';
import {ArrowProps} from "./ArrowProps";
import styles from './Arrow.module.scss'


const LeftArrow: FunctionComponent<ArrowProps> = ({onClick, classname}) => {
    return (
        <button className={`${styles.Arrow} ${styles.ArrowLeft} ${classname}`} onClick={onClick}/>
    )
}

export default LeftArrow;
