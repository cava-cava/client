import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {initIdOMG} from "./initOMG";
import {nextRound} from "./nextRound";

/**
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function endRoundEvent(room: Room, io:Server) {
    if(room.users.filter(user => user.winEvent).length > 0) return

    if(room.game.guessEvent.trigger) {
        room.game.guessEvent.idStep = -1
        room.users.map(user => user.answerEvent.myAnswer = '')
        room.game.guessEvent.trigger = false
        room.game.playerGame.id = -1
        if(++room.game.guessEvent.id < room.users.length) room.game.guessEvent.id = 0
    }

    if(room.game.omgEvent.trigger) {
        room.game.omgEvent.trigger = false
        //Re-initialize OMG for the game
        room.game.omgEvent.id = initIdOMG(room)
    }

    io.to(room.id).emit('endRoundEvent')

    nextRound(room, io)
}
