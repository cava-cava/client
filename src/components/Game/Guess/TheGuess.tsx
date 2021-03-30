import React, {FunctionComponent} from 'react';
import styles from './TheGuess.module.scss'
import QuestionGuess from "./QuestionGuess";
import {User} from "../../../store/user/types";


type TheGuessProps = {
    id: string,
    question?: string,
    users: User[]
}

const TheGuess: FunctionComponent<TheGuessProps> = ({id, question}) => {
    return (
        <div className={styles.TheGuess}>
            <h1>Devine qui ?</h1>
            {question && <QuestionGuess id={id} question={question}/>}
        </div>
    )
}

export default TheGuess;
