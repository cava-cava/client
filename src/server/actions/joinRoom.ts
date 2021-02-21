import {Room} from "../types/rooms";
import {ExtendedSocket} from "../types/socket";

/**
 * Will connect a socket to a specified room
 * @param username string
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
export const joinRoom = (username:string, socket:ExtendedSocket, room:Room) => {
    socket.username = username;
    room.sockets.push(socket);
    socket.join(room.id);
    console.log(socket.id, "Joined", room.id);
    socket.emit('redirect', `/rooms/${room.id}`)
};
