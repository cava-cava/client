import {Card} from "./card";
import {Sounds} from "./sounds";

export interface CardGame {
    id: number
    card?: Card
    cardsActions: Card[]
    showAlternative: boolean
    sounds: Sounds
}

