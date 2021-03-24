import {Socket} from "socket.io";
import {User} from "../../store/user/types";

export interface Room {
    id: string,
    sockets: Socket[],
    users: User[],
    colors: string[]
}

export interface Rooms {
   [key: string]: Room;
}
