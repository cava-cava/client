import {Room} from "../types/rooms";
import {getPlayer} from "./getPlayer";
import {checkpoint} from "./checkpoint";
import {Server} from "socket.io";
import {startTimer} from "./startTimer";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function nextRound(room: Room, io:Server) {
    checkpoint(room, io)
    room.game.round++
    if(room.game.round === room.game.omgEvent.id) {
        room.game.guessEvent.trigger = false
        room.game.omgEvent.trigger = true
    }else {
        if(++room.game.playerGame.id >= room.users.length) {
            room.game.guessEvent.trigger = true
            room.game.omgEvent.trigger = false
            room.game.guessEvent.guess = (room.game.guesses && room.game.guesses.length > 0) ? room.game.guesses[room.game.guessEvent.id] : undefined
            io.to(room.id).emit('sendGuess', room.game.guessEvent.guess)
        } else {
            // next Card
            if (room.game.cards && ++room.game.cardGame.id >= room.game.cards.length) room.game.cardGame.id = 0
            room.game.cardGame.showAlternative = false
        }
        getPlayer(room, io)
    }
    io.to(room.id).emit('startRoundEvent', room.game.guessEvent.trigger, room.game.omgEvent.trigger);
    if(room.game.guessEvent.trigger && !room.game.omgEvent.trigger) startTimer(room, io, 45);
}
