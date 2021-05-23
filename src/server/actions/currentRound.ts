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
export function currentRound(room: Room, io:Server) {
    checkpoint(room, io)
    if(!room.game.guessEvent.trigger && !room.game.omgEvent.trigger) {
        getPlayer(room, io)
        io.to(room.id).emit('pickedCard', room.game.cardGame.card)
    }else {
        io.to(room.id).emit('startRoundEvent', room.game.guessEvent.trigger, room.game.omgEvent.trigger);
        if (room.game.guessEvent.trigger && !room.game.omgEvent.trigger) {
            io.to(room.id).emit('sendGuess', room.game.guessEvent.guess)
            if(room.game.guessEvent.idStep !== -1 && room.game.guessEvent.idStep < room.users.length) {
                io.to(room.id).emit('startAnswersEvent')
            }
        }
    }
    if(room.game.cardGame.card || room.game.guessEvent.guess) startTimer(room, io)
}
