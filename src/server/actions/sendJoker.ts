import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {sendCard} from "./sendCard";
import {sendPointsUser} from "./sendPointsUser";
import {getCardAlternative} from "./getCardAlternative";

/**
 * Get fired for get card in deck game room
 * @param userKey
 * @param playerKey
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function sendJoker(userKey:number, playerKey:number, room: Room, io:Server) {
    // check if can put a joker card
    if (!room.timer.isRunning || !room.game.cards || !room.game.cardGame.card || room.users[userKey].joker <= 0) return;
    // get card alternative
    const alternativeCard = getCardAlternative("Tu fais genre que tout va bien... Tu affiches ton meilleur sourire !", room)
    if(!alternativeCard) return;
    alternativeCard.Points = Math.abs(room.game.cardGame.card.Points)
    //play sound
    if(room.game.cardGame.sounds.idCava >= room.game.cardGame.sounds.cava.length) room.game.cardGame.sounds.idCava = 0
    alternativeCard.audio = room.game.cardGame.sounds.cava[room.game.cardGame.sounds.idCava]
    room.game.cardGame.sounds.idCava++
    // use Joker
    if(--room.users[userKey].joker < 0) room.users[userKey].joker = 0
    io.to(room.id).emit('message', `${room.users[userKey].name} à posé une carte Oh Ça Va !`);
    // use Joker for other
    if(playerKey !== userKey) {
        sendPointsUser(room.users[userKey], alternativeCard.Points)
        ++room.users[userKey].statisticsGame.useJokerForOther;
    } else ++room.users[userKey].statisticsGame.useJokerForMe;
    // add statistics use joker
    ++room.users[userKey].statisticsGame.useJoker;
    sendCard(playerKey, alternativeCard, room, io, true)
}
