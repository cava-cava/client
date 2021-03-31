import {Card} from "./card";
import {Guess} from "./guess";

export interface Game {
    cards?: Card[]
    guesses?: Guess[]
    points: number
    round: number
    idGuesses: number
    triggerGuesses: boolean
    idOMG: number
    triggerOMG: boolean
    idUser: number
    isStart: boolean
    timerRunning: boolean
}
