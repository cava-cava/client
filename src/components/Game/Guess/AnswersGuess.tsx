import React, {FunctionComponent, useEffect, useState} from 'react';
import {User} from "../../../store/user/types";
import {socket} from "../../../socketClient";
import {shuffle} from "../../../mixins/shuffle";

type AnswersGuessProps = {
    roomId: string
    userKey: number
    users: User[]
}

const AnswersGuess: FunctionComponent<AnswersGuessProps> = ({roomId, userKey, users}) => {
    const [show, setShow] = useState(true)
    const [answersUser, setAnswersUser] = useState<User[]>()
    const [stepEvent, setStepEvent] = useState(0)

    const handleClick = (userKey:number) => {
        setShow(false)
        const filterUsers = answersUser?.filter(user => user.key !== userKey)
        setAnswersUser(filterUsers)
        socket.emit("pushAnswersGuess", roomId, userKey, users[stepEvent])
    }

    useEffect(() => {
        const cloneUsers = [...users]
        setAnswersUser(shuffle(cloneUsers))

        const nextStepRoundEvent = (step: number) => {
            console.log(step)
            setStepEvent(step)
            setShow(true)
        }

        socket.on("nextStepRoundEvent", nextStepRoundEvent)

        return () => {
            socket.off("nextStepRoundEvent", nextStepRoundEvent)
        }
    }, []);

    return show ?
        <div>
            <p style={{color: users[stepEvent].color}}>Reponse de {users[stepEvent].name } ?</p>
            {answersUser?.map((user, index) => <div key={index}><button onClick={() => handleClick(user.key)}>{user.answerGuess}</button></div>)}
        </div>
        : <p>En attente du timer...</p>
}

export default AnswersGuess;

