import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {endTimer} from "./endTimer";

/**
 * Get fired to start Timer in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 * @param seconds of timer
 */
export function startTimer(room: Room, io:Server, seconds: number|null = null) {
    if(seconds) {
        if(room.timer.interval) clearInterval(room.timer.interval)
        room.timer.seconds = seconds
        room.timer.interval = setInterval(() => {
            if(!room.timer.isRunning) return
            if (--room.timer.seconds > 0) io.to(room.id).emit('timer', room.timer.seconds)
            else if(room.timer.seconds <= 0) endTimer(room, io)
        }, 1000);
    }
    io.to(room.id).emit('timer', room.timer.seconds)
    if(room.timer.interval && room.timer.seconds > 0) room.timer.isRunning = true
}
