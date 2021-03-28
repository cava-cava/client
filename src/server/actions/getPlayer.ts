import {Room} from "../types/rooms";
import {ExtendedSocket} from "../types/socket";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param socket A connected socket.io socket
 */

export function getPlayer(room: Room, socket:ExtendedSocket) {
    socket.emit('getPlayer', room.users[room.game.idUser]);
    socket.to(room.id).emit('getPlayer', room.users[room.game.idUser]);
}
