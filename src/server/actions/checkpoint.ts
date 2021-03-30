import {Room} from "../types/rooms";
import {Server} from "socket.io";

/**
 * checkpoint for update users and my user in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function checkpoint(room: Room, io:Server) {
    io.to(room.id).emit('updateListUsers', room.users);
    room.users.map((user) => io.to(user.id).emit('checkpoint', user))
}
