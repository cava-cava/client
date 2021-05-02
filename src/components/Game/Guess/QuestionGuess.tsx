import React, {ChangeEvent, FormEvent, FunctionComponent, useState} from 'react';
import {socket} from "../../../socketClient";
import {Answer} from "../../../server/types/answer";
import useSend from "../../../hooks/useSend";
import styles from './TheGuess.module.scss'

import InputText from '../../Form/InputText'

type QuestionGuessProps = {
    roomId: string
    userKey: number
}

const QuestionGuess: FunctionComponent<QuestionGuessProps> = ({roomId, userKey}) => {
    const [answer, setAnswer] = useState('');
    const {send, setSend} = useSend(roomId, userKey)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    }

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
        <div>
            {!send ?
                <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>

                    {/* <InputText id={"answer"} name={"answer"} placeholder="Answer..." value={answer} onChange={handleChange}/> */}
                    <input className={styles.input} type="text" id="answer" name="answer" placeholder="Answer..." value={answer} onChange={handleChange}/>
                    <input className={styles.submit}type="submit" value="Envoyer"/>
                </form>
                : <div>En attente des autres joueurs</div>}

        </div>
    )
}

export default QuestionGuess;

