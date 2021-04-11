import React, {FunctionComponent, useEffect, useState} from "react";
import styles from './EndMessages.module.scss'
import {
    FETCH_MESSAGES_ERROR,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    Message
} from "../../store/messages/types";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";

type EndMessagesProps = {
    gameOver: string[],
}

const EndMessages: FunctionComponent<EndMessagesProps> = ({gameOver}) => {
    const messages: Message[] = useSelector((state: ApplicationState) => state.messages.data)
    const [gameOverMessages, setGameOverMessages] = useState<Message[]>([])

    useEffect(() => {
        setGameOverMessages(messages.filter(message => gameOver.indexOf(message.key) !== -1))
        return () => {
            setGameOverMessages([])
        }
    }, []);
    return (
        <div className={styles.EndMessages}>
            {gameOverMessages.map((gameOverMessage, index) =><div key={index}>
                { index === 0 ? <h1>{gameOverMessage.title}</h1> : <h2>{gameOverMessage.title}</h2> }
                <p>{gameOverMessage.description}</p>
            </div>)}
        </div>
    )
}

export default EndMessages;
