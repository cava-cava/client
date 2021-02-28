import {Socket} from "socket.io";
import {User} from "./users";

export interface Room {
    id: string,
    sockets: Socket[],
    users: User[]
}

export interface Rooms {
   [key: string]: Room;
}
