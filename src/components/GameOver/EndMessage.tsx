import React, {FunctionComponent} from "react";
import styles from './EndMessage.module.scss'

type EndMessageProps = {
    title: string
    description: string
}

const EndMessage: FunctionComponent<EndMessageProps> = ({ title, description}) => {
    return (
        <section className={styles.EndMessage}>
            <h2>{title}</h2>
            <p>{description}</p>
        </section>
    )
}

export default EndMessage;
