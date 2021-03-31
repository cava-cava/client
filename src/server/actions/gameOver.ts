import {Room} from "../types/rooms";
import {Server} from "socket.io";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function checkGameOver(room: Room, io:Server) {
    room.users.map(user => {
        if(user.points >= room.game.points) {
            io.to(room.id).emit('redirect', `/end`);
        }
    })
}
