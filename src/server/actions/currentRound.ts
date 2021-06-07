import {Room} from "../types/rooms";
import {getPlayer} from "./getPlayer";
import {checkpoint} from "./checkpoint";
import {Server} from "socket.io";
import {startTimer} from "./startTimer";
import {getRoundEvent} from "./getRoundEvent";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function currentRound(room: Room, io:Server) {
    checkpoint(room, io)
    if(!room.game.guessEvent.trigger && !room.game.omgEvent.trigger) {
        getPlayer(room, io)
        if(room.game.cardGame.card) io.to(room.id).emit('pickedCard', room.game.cardGame.card)
        if(room.game.cardGame.cardsActions.length > 0) io.to(room.id).emit('setAlternativeCard', room.game.cardGame.cardsActions)
    }else {
        getRoundEvent(room, io)
    }
    startTimer(room, io)
}
