import {Room} from "../types/rooms";

/**
 * Get fired to stop Timer in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 */
export function stopTimer(room: Room) {
    if (!room.timer.isRunning) return
    room.timer.isRunning = false
}
