import React, {FunctionComponent} from 'react';
import styles from './TheTitle.module.scss'

type TheTitleProps = {
    title: string
}

const TheTitle: FunctionComponent<TheTitleProps> = ({title}) => {
    return title ? (<h1 className={styles.TheTitle}>{title}</h1>) : null
}

export default TheTitle;
