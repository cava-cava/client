import {Socket} from "socket.io";
import {User} from "../../store/user/types";

export interface Room {
    id: string,
    sockets: Socket[],
    users: User[]
}

export interface Rooms {
   [key: string]: Room;
}
