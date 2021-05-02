import React, {FunctionComponent} from 'react';
import styles from './MessageTips.module.scss'
import bull1 from '../../assets/svg/bulle_1.svg'
import bull2 from '../../assets/svg/bulle_2.svg'
import bull3 from '../../assets/svg/bulle_3.svg'

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
            {
                index === 0 ? <img src={bull1}/> :
                    index % 2 === 0 ? <img src={bull3}/> : <img src={bull2} />
            }
        </div>)
}

export default MessageTips;
