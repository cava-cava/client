import React, {FunctionComponent} from 'react';
import styles from './TheGuess.module.scss'
import QuestionGuess from "./QuestionGuess";

const TheGuess: FunctionComponent = () => {
    return (
        <div className={styles.TheGuess}>
            <h1>Devine qui ?</h1>
            <QuestionGuess question='Quelle est pour toi le bonheur en 3 mots ?'/>
        </div>
    )
}

export default TheGuess;
