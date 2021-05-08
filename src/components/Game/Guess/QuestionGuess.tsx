import React, {FormEvent, FunctionComponent, useState} from 'react';
import {socket} from "../../../socketClient";
import {Answer} from "../../../server/types/answer";
import useSend from "../../../hooks/useSend";
import styles from './QuestionGuess.module.scss'

import InputText from '../../Form/InputText'

type QuestionGuessProps = {
    roomId: string
    userKey: number
}

const QuestionGuess: FunctionComponent<QuestionGuessProps> = ({roomId, userKey}) => {
    const [answer, setAnswer] = useState('');
    const {send, setSend} = useSend(roomId, userKey)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(!answer || answer.length === 0) return;
        const myAnswer:Answer = {
            userKey: userKey,
            answer: answer
        }
        socket.emit('sendAnswerGuess', roomId, userKey, myAnswer)
        setSend(true)
    }

    return (
        <div className={styles.QuestionGuess}>
            {!send ?
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <InputText id={"answer"} name={"answer"} placeholder="Answer..." setValue={setAnswer} />
                    <input type="submit" value="Envoyer"/>
                </form>
                : <div>En attente des autres joueurs</div>}
        </div>
    )
}

export default QuestionGuess;

