import {Server} from "socket.io";
import {ExtendedSocket} from "../types/socket";

export function winOmg(roomId: string, userId: string, socket:ExtendedSocket,io:Server) {
    io.to(userId).emit('message', "Bravo ! Tu as gagné !");
    socket.to(roomId).emit('message', "Tu as perdu...");
    io.to(roomId).emit('winOmg')
}
