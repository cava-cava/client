import {Card} from "./card";

export interface CardGame {
    id: number
    card?: Card
    cardsActions: Card[]
    showAlternative: boolean
}

