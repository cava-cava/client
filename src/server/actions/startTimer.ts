import {Room} from "../types/rooms";
import {Server} from "socket.io";

/**
 * Get fired to start Timer in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 * @param seconds of timer
 */
export function startTimer(room: Room, io:Server, seconds: number) {
    room.users.map(user => user.timerRunning = true)
    io.to(room.id).emit('startTimer', seconds)
}
