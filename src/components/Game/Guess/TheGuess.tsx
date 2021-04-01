import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './TheGuess.module.scss'
import QuestionGuess from "./QuestionGuess";
import {User} from "../../../store/user/types";
import TheBooty from "../TheBooty";
import useRoundEvent from "../../../hooks/useRoundEvent";
import AnswersGuess from "./AnswersGuess";
import {socket} from "../../../socketClient";
import {shuffle} from "../../../mixins/shuffle";

type TheGuessProps = {
    roomId: string,
    question?: string,
    users: User[],
    userKey: number
}

const TheGuess: FunctionComponent<TheGuessProps> = ({roomId, question, users, userKey}) => {
    const { win, lose } = useRoundEvent();
    const [showAnswers, setShowAnswers] = useState(false)
    const [answersUsers, setAnswersUsers] = useState<User[]>()

    useEffect(() => {
        const startAnswersEvent = () => {
            setShowAnswers(true)
            setAnswersUsers(shuffle(users))
        }

        socket.on("startAnswersEvent", startAnswersEvent)
        return () => {
            socket.off("startAnswersEvent", startAnswersEvent)
        }
    }, []);

    return (
        <div className={styles.TheGuess}>
            <h1>Devine qui ?</h1>
            <p>{question}</p>
            {(question && !showAnswers && !win && !lose) && <QuestionGuess roomId={roomId} userKey={userKey}/>}
            {(showAnswers && !win && !lose) && <AnswersGuess roomId={roomId} userKey={userKey} answersUser={answersUsers}/>}
            { (win && !lose) && <TheBooty roomId={roomId} userKey={userKey} showHappiness={false}/> }
            { (lose && !win) && <span>Tu as perdu</span> }
        </div>
    )
}

export default TheGuess;
