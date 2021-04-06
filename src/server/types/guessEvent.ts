import {Guess} from "./guess";

export interface GuessEvent {
    id: number
    guess?: Guess
    trigger: boolean
    idStep: number
}

