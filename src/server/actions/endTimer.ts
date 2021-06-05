import {Room} from "../types/rooms";
import {nextRound} from "./nextRound";
import {Server} from "socket.io";
import {nextStepRoundEvent} from "./nextStepRoundEvent";
import {clearProgressBar} from "./clearProgressBar";

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
        room.game.cardGame.cardsActions = []
        io.to(room.id).emit('clearCards')
        clearProgressBar(room.users)
        nextRound(room, io)
    } else {
        nextStepRoundEvent(room, io)
    }
}
