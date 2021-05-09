import React, {FormEvent, FunctionComponent, useState} from 'react';
import {socket} from "../../../socketClient";
import {Answer} from "../../../server/types/answer";
import useSend from "../../../hooks/useSend";
import styles from './QuestionGuess.module.scss'

import InputText from '../../Form/InputText'
import ErrorMessage from "../../Form/ErrorMessage";
import WaitingUsers from "../../Users/WaitingUsers";

type QuestionGuessProps = {
    roomId: string
    userKey: number
}

const QuestionGuess: FunctionComponent<QuestionGuessProps> = ({roomId, userKey}) => {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const {send, setSend} = useSend(roomId, userKey)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if(!answer || answer.length === 0) {
            if(!error || error.length === 0) setError(`Réponse vide...`)
            if(!showError) setShowError(true)
        } else {
            const myAnswer:Answer = {
                userKey: userKey,
                answer: answer
            }
            socket.emit('sendAnswerGuess', roomId, userKey, myAnswer)
            setSend(true)
        }
    }

    const keypressEvent = () => {
        if(answer.length > 0) {
            if(error && error.length > 0) setError(``)
            if(showError) setShowError(false)
        }
    }

    return (
        <div className={styles.QuestionGuess}>
            {!send ?
                <form autoComplete="off" onSubmit={handleSubmit} onKeyUp={keypressEvent}>
                    <InputText id={"answer"} name={"answer"} placeholder="Réponse..." setValue={setAnswer} hasError={!!(error && error.length > 0)}/>
                    <ErrorMessage error={error} />
                    <input type="submit" value="Envoyer"/>
                </form>
                : <WaitingUsers text="En attente des autres joueurs ..." users={[]}/>}
        </div>
    )
}

export default QuestionGuess;

