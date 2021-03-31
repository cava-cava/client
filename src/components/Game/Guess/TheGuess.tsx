import React, {FunctionComponent, useState} from 'react';
import styles from './TheGuess.module.scss'
import QuestionGuess from "./QuestionGuess";
import {User} from "../../../store/user/types";
import TheBooty from "../TheBooty";

type TheGuessProps = {
    roomId: string,
    question?: string,
    users: User[],
    userKey: number
}

const TheGuess: FunctionComponent<TheGuessProps> = ({roomId, question, users, userKey}) => {
    const [win, setWin] = useState(false)

    return (
        <div className={styles.TheGuess}>
            <h1>Devine qui ?</h1>
            {question && <QuestionGuess roomId={roomId} question={question} userKey={userKey}/>}
            { win ? <TheBooty roomId={roomId} userKey={userKey} /> : 'perdu'}
        </div>
    )
}

export default TheGuess;
