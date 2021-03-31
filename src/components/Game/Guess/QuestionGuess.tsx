import React, {ChangeEvent, FormEvent, FunctionComponent, useState} from 'react';
import {colors} from "../../../mixins/color";
import {socket} from "../../../socketClient";

type QuestionGuessProps = {
    roomId: string
    userKey: number
    question: string
}

const QuestionGuess: FunctionComponent<QuestionGuessProps> = ({roomId, userKey, question}) => {
    const [answer, setAnswer] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        socket.emit('sendAnswerGuess', roomId, userKey, answer)
        socket.emit('endRoundEvent', roomId)
        console.color('Envoyer la reponse au serveur socket io', colors.fuchsia)
    }

    return (
        <div>
            <p>{question}</p>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <input type="text" id="answer" name="answer" placeholder="Answer..." value={answer} onChange={handleChange}/>
                <input type="submit" value="Envoyez"/>
            </form>
        </div>
    )
}

export default QuestionGuess;

