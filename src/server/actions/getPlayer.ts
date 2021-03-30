import {Room} from "../types/rooms";
import {Server} from "socket.io";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function getPlayer(room: Room, io:Server) {
    io.to(room.id).emit('getPlayer', room.users[room.game.idUser]);
}
