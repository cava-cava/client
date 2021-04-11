import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {gameOver} from "./gameOver";
import {checkpoint} from "./checkpoint";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function checkGameOver(room: Room, io: Server) {
    room.users.map(user => {
        if (user.points >= room.game.points) {
            gameOver(room)
            checkpoint(room,io)
            io.to(room.id).emit('redirect', `/end`);
        }
    })
}
