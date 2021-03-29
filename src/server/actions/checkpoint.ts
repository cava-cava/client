import {Room} from "../types/rooms";
import {ExtendedSocket} from "../types/socket";

/**
 * checkpoint for update users and my user in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param socket A connected socket.io socket
 */

export function checkpoint(room: Room, socket:ExtendedSocket) {
    socket.to(room.id).emit('updateListUsers', room.users);
    socket.emit('updateListUsers', room.users);
    socket.emit('checkpoint', room.users[socket.key]);
}
