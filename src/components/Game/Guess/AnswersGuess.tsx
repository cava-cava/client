import React, {FunctionComponent, useEffect, useState} from "react";
import {socket} from "../../../socketClient";
import {Answer} from "../../../server/types/answer";
import {User} from "../../../store/user/types";
import styles from "./AnswersGuess.module.scss";
import ListUsers from "../../Users/ListUsers";
import WaitingUsers from "../../Users/WaitingUsers";
import useSend from "../../../hooks/useSend";
import ButtonAnswersGuess from "./ButtonAnswersGuess";
import MessageGame from "../MessageGame";

type AnswersGuessProps = {
    roomId: string
    userKey: number
    users: User[]
    showResults: boolean
};

const AnswersGuess: FunctionComponent<AnswersGuessProps> = ({
                                                                roomId,
                                                                userKey,
                                                                users,
                                                                showResults
                                                            }) => {
    const {send, setSend} = useSend(roomId, userKey);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const allAnswersUserKey = users[userKey].answerEvent.allAnswersUserKey

    const handleClick = (myAnswer: Answer) => {
        if (allAnswersUserKey.length === 0 || send) return
        myAnswer.myAnswerKey = allAnswersUserKey[0]
        socket.emit("pushAnswersGuess", roomId, userKey, myAnswer)
    };

    useEffect(() => {
        const getAnswers = (answers: Answer[]) => {
            setAnswers(answers);
        };

        socket.on("getAnswers", getAnswers);


        socket.emit("getAnswers", roomId, userKey);
        return () => {
            socket.off("getAnswers", getAnswers);
        };
    }, []);

    return (
        <div className={styles.AnswersGuess}>
            <MessageGame />
            {allAnswersUserKey.length > 0 &&
                <ListUsers users={[users[allAnswersUserKey[0]]]} arrayLength={1} showName={false}/>
            }
            {(!send || showResults) &&
                                        <div>
                                            {answers?.map((answer, index) => (
                                                <ButtonAnswersGuess key={index} userKey={userKey} answer={answer} users={users}
                                                                    handleClick={handleClick} showResults={showResults}/>))}
                                        </div>
            }
            { (send && !showResults) && <WaitingUsers text="En attente des autres joueurs..." users={users.filter(user => !user.answerEvent.send)}/>}
        </div>
    )
};

export default AnswersGuess;
