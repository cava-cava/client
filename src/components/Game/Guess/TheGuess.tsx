import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './TheGuess.module.scss'
import QuestionGuess from "./QuestionGuess";
import {User} from "../../../store/user/types";
import TheBooty from "../TheBooty";
import useRoundEvent from "../../../hooks/useRoundEvent";
import AnswersGuess from "./AnswersGuess";
import {socket} from "../../../socketClient";
import TheHeader from "../Header/TheHeader";

type TheGuessProps = {
    roomId: string,
    question?: string,
    users: User[],
    userKey: number
}

const TheGuess: FunctionComponent<TheGuessProps> = ({roomId, question, users, userKey}) => {
    const { win, lose } = useRoundEvent(roomId, userKey);
    const [showAnswers, setShowAnswers] = useState(false)

    useEffect(() => {
        const startAnswersEvent = () => {
            setShowAnswers(true)
        }

        socket.on("startAnswersEvent", startAnswersEvent)
        return () => {
            socket.off("startAnswersEvent", startAnswersEvent)
        }
    }, []);

    return (
        <section className={`${styles.TheGuess} ${showAnswers ? styles.answer : styles.question}`}>
            <TheHeader user={users[userKey]} roomId={roomId} triggerGuesses={true}/>
            {(question && !showAnswers && !win && !lose) && <QuestionGuess roomId={roomId} userKey={userKey} question={question} usersWaiting={users.filter(user => !user.answerEvent.send)}/>}
            {(showAnswers && !win && !lose) && <AnswersGuess roomId={roomId} userKey={userKey} users={users}/>}
            <TheBooty win={win} lose={lose} roomId={roomId} userKey={userKey} showHappiness={false}/>
        </section>
    )
}

export default TheGuess;
