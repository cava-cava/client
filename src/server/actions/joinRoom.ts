import {Room} from "../types/rooms";
import {ExtendedSocket} from "../types/socket";
import {User} from "../../store/user/types";

/**
 * Will connect a socket to a specified room
 * @param username string
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
export const joinRoom = (username:string, socket:ExtendedSocket, room:Room) => {
    socket.username = username;
    const user:User = {
        id: socket.id,
        name: username
    };
    room.users.push(user);
    room.sockets.push(socket);
    socket.join(room.id);
    console.log(`${socket.username}[${socket.id}] Joined ${room.id}`);
    socket.emit('redirect', `/rooms/${room.id}`);
    socket.to(room.id).emit('updateUsers', room.users);
};
