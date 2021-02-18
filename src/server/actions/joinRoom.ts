import {Socket} from "socket.io";
import {Room} from "../types/rooms";

/**
 * Will connect a socket to a specified room
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
export const joinRoom = (socket:Socket, room:Room) => {
    room.sockets.push(socket);
    socket.join(room.id);
    console.log(socket.id, "Joined", room.id);
    socket.emit('redirect', `/rooms/${room.id}`)
};
