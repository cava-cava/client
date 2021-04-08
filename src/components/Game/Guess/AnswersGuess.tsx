import React, {FunctionComponent, useEffect, useState} from 'react';
import {socket} from "../../../socketClient";
import {Answer} from "../../../server/types/answer";
import {User} from "../../../store/user/types";
import useSend from "../../../hooks/useSend";

type AnswersGuessProps = {
    roomId: string
    userKey: number
    users: User[]
}

const AnswersGuess: FunctionComponent<AnswersGuessProps> = ({roomId, userKey, users}) => {
    const {send, setSend} = useSend(roomId, userKey)
    const [answers, setAnswers] = useState<Answer[]>()
    const [stepEvent, setStepEvent] = useState(0)

    const handleClick = (myAnswer:Answer) => {
        setSend(true)
        myAnswer.idStep = stepEvent
        socket.emit("pushAnswersGuess", roomId, userKey, myAnswer)
        const filterAnswers = answers?.filter(answerUser => answerUser !== myAnswer)

        if(filterAnswers?.length === 1) {
            const lastAnswer = filterAnswers[0]
            lastAnswer.idStep = stepEvent + 1
            socket.emit("pushAnswersGuess", roomId, userKey, lastAnswer)
        }else setAnswers(filterAnswers)
    }

    useEffect(() => {
        const nextStepRoundEvent = (step: number) => {
            setStepEvent(step)
            setSend(false)
        }

        const getAnswers = (answers: Answer[]) => {
            setAnswers(answers)
            setStepEvent(users.length - answers.length)
        }

        socket.on("nextStepRoundEvent", nextStepRoundEvent)
        socket.on("getAnswers", getAnswers)

        socket.emit("getAnswers", roomId, userKey)
        return () => {
            socket.off("nextStepRoundEvent", nextStepRoundEvent)
            socket.off("getAnswers", getAnswers)
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

