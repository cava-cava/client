import React, {ChangeEvent, FormEvent, FunctionComponent, useState} from 'react';
import {colors} from "../../../mixins/color";
import {socket} from "../../../socketClient";

type QuestionGuessProps = {
    roomId: string
    userKey: number
}

const QuestionGuess: FunctionComponent<QuestionGuessProps> = ({roomId, userKey}) => {
    const [answer, setAnswer] = useState('');
    const [submit, setSubmit] = useState(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        socket.emit('sendAnswerGuess', roomId, userKey, answer)
        setSubmit(true)
    }

    return (
        <div>
            {!submit ?
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <input type="text" id="answer" name="answer" placeholder="Answer..." value={answer} onChange={handleChange}/>
                    <input type="submit" value="Envoyez"/>
                </form>
                : <div>En attente des autres joueurs</div>}

        </div>
    )
}

export default QuestionGuess;

