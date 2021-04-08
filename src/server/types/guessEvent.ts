import {Guess} from "./guess";
import {Answer} from "./answer";

export interface GuessEvent {
    id: number
    guess?: Guess
    answers: Answer[]
    trigger: boolean
    idStep: number
}

