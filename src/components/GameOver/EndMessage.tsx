import React, {FunctionComponent} from "react";
import styles from './EndMessage.module.scss'

type EndMessageProps = {
    showImg: boolean
    img: string
    title: string
    description: string
}

const EndMessage: FunctionComponent<EndMessageProps> = ({ showImg, img, title, description}) => {
    return (
        <section className={styles.EndMessage}>
            {(showImg && img && img.length > 0) && <img src={img} alt={title}/>}
            <h2>{title}</h2>
            <p>{description}</p>
        </section>
    )
}

export default EndMessage;
