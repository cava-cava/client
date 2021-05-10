import React, { FunctionComponent, useEffect, useState } from "react";
import { socket } from "../../../socketClient";
import { Answer } from "../../../server/types/answer";
import { User } from "../../../store/user/types";
import useSend from "../../../hooks/useSend";
import styles from "./AnswersGuess.module.scss";
import ListUsers from "../../Users/ListUsers";
import WaitingUsers from "../../Users/WaitingUsers";

type AnswersGuessProps = {
  roomId: string;
  userKey: number;
  users: User[];
};

const AnswersGuess: FunctionComponent<AnswersGuessProps> = ({
  roomId,
  userKey,
  users,
}) => {
  const { send, setSend } = useSend(roomId, userKey);
  const [answers, setAnswers] = useState<Answer[]>();
  const [stepEvent, setStepEvent] = useState<number>(0);

  const handleClick = (myAnswer: Answer) => {
    setSend(true);
    myAnswer.idStep = stepEvent;
    socket.emit("pushAnswersGuess", roomId, userKey, myAnswer);
  };

  useEffect(() => {
    const getAnswers = (answers: Answer[]) => {
      setAnswers(answers.filter(answer => answer.userKey !== userKey));
    };

    socket.on("getAnswers", getAnswers);

    socket.emit("getAnswers", roomId, userKey);
    return () => {
      socket.off("getAnswers", getAnswers);
    };
  }, []);

  return !send ? (
    <div className={styles.AnswersGuess}>
      <p>Qu'est-ce qu'à répondu {users[stepEvent]?.name} ?</p>
      <ListUsers users={[users[stepEvent]]} arrayLength={1} showName={false}/>
      <div>
        {answers?.map((answer, index) => (<button key={index} onClick={() => handleClick(answer)}>{answer.answer}</button>))}
      </div>
    </div>
  ) : (<WaitingUsers text="En attente des autres joueurs..." users={users.filter(user => !user.answerEvent.send)}/>);
};

export default AnswersGuess;
