import React, {ChangeEvent, FunctionComponent, useEffect, useState} from 'react';
import {User} from "../../../store/user/types";
import {socket} from "../../../socketClient";

type AnswersGuessProps = {
    roomId: string
    userKey: number
    users?: User[]
}

const AnswersGuess: FunctionComponent<AnswersGuessProps> = ({roomId, userKey, users}) => {
    const [show, setShow] = useState(true)
    const [answersUser, setAnswersUser] = useState<User[]>()

    const handleClick = (userKey:number) => {
        setShow(false)
        const filterUsers = answersUser?.filter(user => user.key !== userKey)
        setAnswersUser(filterUsers)
    }

    useEffect(() => {
        setAnswersUser(users)
        const startTimer = () => {
            setShow(true)
        }

        socket.on("startTimer", startTimer)

        return () => {
            socket.off("startTimer", startTimer)
        }
    }, []);

    return show ?
        <div>
            {answersUser?.map((user, index) => <div key={index}><button onClick={() => handleClick(user.key)}>{user.answerGuess}</button></div>)}
        </div>
        : <p>En attente du timer...</p>
}

export default AnswersGuess;

