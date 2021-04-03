import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {initIdOMG} from "./initOMG";
import {nextRound} from "./nextRound";

/**
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function endRoundEvent(room: Room, io:Server) {
    if(room.users.filter(user => user.winBooty).length > 0) return

    if(room.game.triggerGuesses) {
        room.game.idStepGuess = -1
        room.users.map(user => user.answerGuess = '')
        room.game.triggerGuesses = false
        room.game.idUser = -1
        if(++room.game.idGuesses < room.users.length) room.game.idGuesses = 0
    }

    if(room.game.triggerOMG) {
        room.game.triggerOMG = false
        //Re-initialize OMG for the game
        room.game.idOMG = initIdOMG(room)
    }

    io.to(room.id).emit('endRoundEvent')

    nextRound(room, io)
}
