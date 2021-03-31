import {Card} from "./card";
import {Guess} from "./guess";

export interface Game {
    cards?: Card[]
    guesses?: Guess[]
    points: number
    round: number
    idCards: number
    idGuesses: number
    triggerGuesses: boolean
    idStepGuess: number
    idOMG: number
    triggerOMG: boolean
    idUser: number
    isStart: boolean
    timerRunning: boolean
}
