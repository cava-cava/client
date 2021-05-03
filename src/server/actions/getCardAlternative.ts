import {Room} from "../types/rooms";
import {Card} from "../types/card";

/**
 * Get fired for get card in deck game room
 * @param description
 * @param room An object that represents a room from the `rooms` instance variable object
 */
export function getCardAlternative(description:string, room: Room) {
    if(!room.game.cardGame.card) return;

    let alternativeCard: Card;

    if(!room.game.cardGame.showAlternative) {
        alternativeCard = room.game.cardGame.card.Alternative[0]
        room.game.cardGame.showAlternative = true
    }else {
        alternativeCard = room.game.cardGame.card
        alternativeCard.Description = description
        alternativeCard.animation = undefined
    }

    return alternativeCard;
}
