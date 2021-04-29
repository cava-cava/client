import {Room} from "../types/rooms";
import {ExtendedSocket} from "../types/socket";
import {User} from "../../store/user/types";
import {Server} from "socket.io";

/**
 * Will connect a socket to a specified game
 * @param username string
 * @param avatar string
 * @param io A connected socket.io server
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
export const joinRoomGame = (username:string, avatar:string, io:Server, socket:ExtendedSocket, room:Room) => {
    const usersDisconnected = room.usersDisconnected.filter(user => user.name === username)
    if(usersDisconnected.length > 0) {
        const user:User = usersDisconnected[0]
        socket.username = username
        socket.avatar = avatar
        user.avatar = avatar
        user.id = socket.id
        socket.color = user.color
        room.colors = room.colors.filter(color => user.color !== color)
        room.users.push(user);
        room.sockets.push(socket);
        socket.join(room.id);
        room.usersDisconnected = room.usersDisconnected.filter(userDisconnected => userDisconnected.key !== user.key)
        console.log(`${socket.username}[${socket.id}] Re Joined ${room.id}`);
        socket.emit('redirect', `/game/${room.id}`);
        if(room.usersDisconnected.length <= 0) socket.to(room.id).emit('userDisconnected', false);
    }else socket.emit('error', "La room est en plein jeu");
};
