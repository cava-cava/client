import {Card} from "./card";
import {Guess} from "./guess";

export interface Game {
    cards?: Card[]
    guesses?: Guess[]
    points: number
    round: number
    idGuesses?: number
    idOMG?: number
    idUser: number
    isStart: boolean
}
