import React, {FunctionComponent, useEffect, useState} from 'react';
import {socket} from "../../../socketClient";
import {shuffle} from "../../../mixins/shuffle";
import {Answer} from "../../../server/types/answer";
import {User} from "../../../store/user/types";
import useSend from "../../../hooks/useSend";

type AnswersGuessProps = {
    roomId: string
    userKey: number
    users: User[]
}

const AnswersGuess: FunctionComponent<AnswersGuessProps> = ({roomId, userKey, users}) => {
    const {send, setSend} = useSend(userKey)
    const [answers, setAnswers] = useState<Answer[]>()
    const [stepEvent, setStepEvent] = useState(0)

    const handleClick = (myAnswer:Answer) => {
        setSend(true)
        myAnswer.userKey = stepEvent
        socket.emit("pushAnswersGuess", roomId, userKey, myAnswer)
        const filterAnswers = answers?.filter(answerUser => answerUser !== myAnswer)

        if(filterAnswers?.length === 1) {
            const lastAnswer = filterAnswers[0]
            lastAnswer.userKey = stepEvent + 1
            socket.emit("pushAnswersGuess", roomId, userKey, lastAnswer)
        }else setAnswers(filterAnswers)
    }

    useEffect(() => {
        const cloneUsers = shuffle([...users])
        let answers:Answer[] = [];
        cloneUsers.forEach(user => answers.push(user.answerEvent.myAnswer))
        setAnswers(answers)

        const nextStepRoundEvent = (step: number) => {
            setStepEvent(step)
            setSend(false)
        }

        socket.on("nextStepRoundEvent", nextStepRoundEvent)

        return () => {
            socket.off("nextStepRoundEvent", nextStepRoundEvent)
        }
    }, []);

    return !send ?
        <div>
            <p style={{color: users[stepEvent].color}}>Reponse de {users[stepEvent].name } ?</p>
            {answers?.map((answer, index) => <div key={index}><button onClick={() => handleClick(answer)}>{answer.answer}</button></div>)}
        </div>
        : <p>En attente des autres joueurs...</p>
}

export default AnswersGuess;

