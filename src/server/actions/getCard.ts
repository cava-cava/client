import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {sendCard} from "./sendCard";

/**
 * Get fired for get card in deck game room
 * @param playerKey
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function getCard(playerKey:number, room: Room, io:Server) {
    if (room.timer.isRunning || !room.game.cards) return;
    const card = room.game.cards[room.game.cardGame.id];

    // add statistics bonus / malus
    card.Points > 0 ? ++room.users[playerKey].statisticsGame.bonus : ++room.users[playerKey].statisticsGame.malus

    sendCard(playerKey, card, room, io)
}
