import React, {FunctionComponent} from 'react';
import styles from './MessageTips.module.scss'

type MessageTipsProps = {
    index: number,
    message: string
    date?: string | null
}

const MessageTips: FunctionComponent<MessageTipsProps> = ({index, message, date}) => {
    return (
        <div className={styles.MessageTips} style={{opacity: date ? 1 : 0.5}}>
            <p>{message}</p>
            {!date && <p>en attente de validation...</p>}
        </div>)
}

export default MessageTips;
