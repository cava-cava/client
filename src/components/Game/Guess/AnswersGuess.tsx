import React, {FunctionComponent} from 'react';
import {User} from "../../../store/user/types";

type AnswersGuessProps = {
    roomId: string
    userKey: number
    answersUser?: User[]
}

const AnswersGuess: FunctionComponent<AnswersGuessProps> = ({roomId, userKey, answersUser}) => {
    return (
        <div>
            {answersUser?.map(user => <div>{user.answerGuess}</div>)}
        </div>
    )
}

export default AnswersGuess;

