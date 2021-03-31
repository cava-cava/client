import React, {FunctionComponent} from 'react';
import styles from './TheGuess.module.scss'
import QuestionGuess from "./QuestionGuess";
import {User} from "../../../store/user/types";
import TheBooty from "../TheBooty";
import useRoundEvent from "../../../hooks/useRoundEvent";

type TheGuessProps = {
    roomId: string,
    question?: string,
    users: User[],
    userKey: number
}

const TheGuess: FunctionComponent<TheGuessProps> = ({roomId, question, users, userKey}) => {
    const { win, lose } = useRoundEvent();

    return (
        <div className={styles.TheGuess}>
            <h1>Devine qui ?</h1>
            {question && <QuestionGuess roomId={roomId} question={question} userKey={userKey}/>}
            { (win && !lose) && <TheBooty roomId={roomId} userKey={userKey} /> }
            { (lose && !win) && <span>Tu as perdu</span> }
        </div>
    )
}

export default TheGuess;
