import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './TheGuess.module.scss'
import QuestionGuess from "./QuestionGuess";
import {User} from "../../../store/user/types";
import TheBooty from "../TheBooty";
import useRoundEvent from "../../../hooks/useRoundEvent";
import AnswersGuess from "./AnswersGuess";
import {socket} from "../../../socketClient";
import TheHeader from "../Header/TheHeader";
import TheTitle from "../../TheTitle";

type TheGuessProps = {
    roomId: string,
    question?: string,
    users: User[],
    userKey: number
}

const TheGuess: FunctionComponent<TheGuessProps> = ({roomId, question, users, userKey}) => {
    const { win, lose } = useRoundEvent(roomId, userKey);
    const [showAnswers, setShowAnswers] = useState(false)
    const [showResultsAnswers, setShowResultsAnswers] = useState(false)

    useEffect(() => {
        const startAnswersEvent = () => {
            setShowAnswers(true)
        }

        const showResultsAnswersEvent = () => {
            setShowResultsAnswers(true)
        }

        socket.on("startAnswersEvent", startAnswersEvent)
        socket.on("showResultsAnswersEvent", showResultsAnswersEvent)

        return () => {
            socket.off("startAnswersEvent", startAnswersEvent)
            socket.off("showResultsAnswersEvent", showResultsAnswersEvent)
        }
    }, []);

    return (
        <section className={`${styles.TheGuess} ${showAnswers ? styles.answer : styles.question}`}>
            <TheHeader user={users[userKey]} roomId={roomId} triggerGuesses={true}/>
            <div>
                {((!showAnswers && !showResultsAnswers) || (win || lose)) && <TheTitle title="Devine Qui ?"/> }
                {(question && !showAnswers && !showResultsAnswers && !win && !lose) && <QuestionGuess roomId={roomId} userKey={userKey} question={question} usersWaiting={users.filter(user => !user.answerEvent.send)}/>}
                {((showAnswers || showResultsAnswers) && !win && !lose) && <AnswersGuess roomId={roomId} userKey={userKey} users={users} showResults={showResultsAnswers}/>}
                <TheBooty win={win} lose={lose} roomId={roomId} userKey={userKey} showHappiness={false} users={users.filter(user => user.winEvent)}/>
            </div>
        </section>
    )
}

export default TheGuess;
