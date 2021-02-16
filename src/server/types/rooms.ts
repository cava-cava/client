import {Socket} from "socket.io";

export interface Room {
    id: string,
    sockets: Socket[]
}

export interface Rooms {
   [key: string]: Room;
}