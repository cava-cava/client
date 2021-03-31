import {Room} from "../types/rooms";
import {nextRound} from "./nextRound";
import {Server} from "socket.io";
/**
 * Get fired to end Timer in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 * @param userId
 */
export function endTimer(room: Room, io:Server, userId: number) {
    if(!room.game.timerRunning) return;
    room.users[userId].timerRunning = false

    if(room.users.filter(user => user.timerRunning).length <= 0) {
        room.game.timerRunning = false
        if (!room.game.triggerGuesses && !room.game.triggerOMG) nextRound(room, io)
        else {
            //Event next
        }
    }
}
