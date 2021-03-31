import {Room} from "../types/rooms";
import {getPlayer} from "./getPlayer";
import {checkpoint} from "./checkpoint";
import {Server} from "socket.io";
import {Guess} from "../types/guess";
import {checkGameOver} from "./gameOver";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function nextRound(room: Room, io:Server) {
    checkGameOver(room, io)
    checkpoint(room, io)
    room.game.round++
    if(room.game.round === room.game.idOMG) {
        room.game.triggerGuesses = false
        room.game.triggerOMG = true
    }else {
        if(++room.game.idUser >= room.users.length) {
            room.game.triggerGuesses = true
            room.game.triggerOMG = false
            const guess:Guess | undefined = (room.game.guesses && room.game.guesses.length > 0) ? room.game.guesses[room.game.idGuesses] : undefined
            io.to(room.id).emit('sendGuess', guess)
        }
        getPlayer(room, io)
    }
    io.to(room.id).emit('startRoundEvent', room.game.triggerGuesses, room.game.triggerOMG);
}
