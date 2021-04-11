import {Room} from "../types/rooms";
import {nextRound} from "./nextRound";
import {Server} from "socket.io";
import {nextStepRoundEvent} from "./nextStepRoundEvent";

/**
 * Get fired to end Timer in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function endTimer(room: Room, io: Server) {
    if (!room.timer.isRunning) return
    io.to(room.id).emit('timer', 0)
    if(room.timer.interval) clearInterval(room.timer.interval)
    room.timer.isRunning = false
    if (!room.game.guessEvent.trigger && !room.game.omgEvent.trigger) {
        room.game.cardGame.card = undefined
        io.to(room.id).emit('pickedCard', room.game.cardGame.card)
        nextRound(room, io)
    } else {
        nextStepRoundEvent(room, io)
    }
}
