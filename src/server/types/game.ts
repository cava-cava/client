import {Card} from "./card";
import {Guess} from "./guess";
import {CardGame} from "./cardGame";
import {PlayerGame} from "./playerGame";
import {GuessEvent} from "./guessEvent";
import {OmgEvent} from "./omgEvent";
import {Omg} from "./omg";

export interface Game {
    cards?: Card[]
    guesses?: Guess[]
    omgs?: Omg[]
    points: number
    round: number
    cardGame: CardGame
    guessEvent: GuessEvent
    omgEvent: OmgEvent
    playerGame: PlayerGame
    isStart: boolean
    isGameOver: boolean
    isLoading: boolean
}
