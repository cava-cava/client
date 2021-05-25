import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {sendCard} from "./sendCard";
import {getCardAlternative} from "./getCardAlternative";

/**
 * Get fired for get card in deck game room
 * @param userKey
 * @param playerKey
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function sendDirt(userKey:number, playerKey:number, room: Room, io:Server) {
    // check if can put a dirt card
    if (!room.timer.isRunning || !room.game.cards || !room.game.cardGame.card || room.users[userKey].dirt <= 0) return;
    // get card alternative
    const alternativeCard = getCardAlternative("Tout le monde se moque de toi... C’est pas cool !", room)
    if(!alternativeCard) return;
    alternativeCard.Points = -Math.abs(room.game.cardGame.card.Points)
    // use Dirt
    if(--room.users[userKey].dirt < 0) room.users[userKey].dirt = 0
    io.to(room.id).emit('message', `${room.users[userKey].name} à posé une carte Cheh !`);
    // add statistics use dirt
    ++room.users[userKey].statisticsGame.useDirt;
    sendCard(playerKey, alternativeCard, room, io, true)
}
