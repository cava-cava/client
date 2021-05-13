import React, {FunctionComponent} from "react";
import {Answer} from "../../../server/types/answer";
import {User} from "../../../store/user/types";
import styles from './ButtonAnswersGuess.module.scss'

type ButtonAnswersGuessProps = {
    userKey: number;
    answer: Answer;
    users: User[];
    handleClick: (answer: Answer) => void
    showResults: boolean
};

const ButtonAnswersGuess: FunctionComponent<ButtonAnswersGuessProps> = ({
                                                                            userKey,
                                                                            answer,
                                                                            users,
                                                                            handleClick,
                                                                            showResults
                                                                        }) => {
    const myAnswer = users[userKey].answerEvent.myAnswersUsers.filter(myAnswer => myAnswer.userKey === answer.userKey)
    const showGoodAnswerUser = (myAnswer.length > 0 && myAnswer[0].myAnswerKey !== myAnswer[0].userKey && users[myAnswer[0].userKey])

    const onClick = () => {
        if(showResults || myAnswer.length > 0) return
        handleClick(answer)
    }

    return (
        <button className={styles.ButtonAnswersGuess} onClick={onClick} disabled={showResults || myAnswer.length > 0}>
            <div
                className={`${styles.ButtonAnswersGuessBackground} ${(!showResults && myAnswer.length > 0) && styles.ButtonAnswersGuessBackgroundActive} ${(showResults && showGoodAnswerUser) && styles.ButtonAnswersGuessBackgroundBad} ${(showResults && !showGoodAnswerUser) && styles.ButtonAnswersGuessBackgroundGood}`}>{answer.answer}</div>
            <div>
                {(myAnswer.length > 0 && (myAnswer[0].myAnswerKey || myAnswer[0].myAnswerKey === 0) && users[myAnswer[0].myAnswerKey]) ? (<img
                    src={`/smiley/${users[myAnswer[0].myAnswerKey].color.replace('#', '')}/smiley_${users[myAnswer[0].myAnswerKey].avatar}.png`}/>) : null}
                {(showResults && showGoodAnswerUser) && <img
                    src={`/smiley/${users[answer.userKey].color.replace('#', '')}/smiley_${users[answer.userKey].avatar}.png`}/>}
            </div>
        </button>
    );
};

export default ButtonAnswersGuess;
