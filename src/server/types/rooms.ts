import {Socket} from "socket.io";
import {User} from "../../store/user/types";
import {Game} from "./game";
import {Timer} from "./timer";

export interface Room {
    id: string,
    sockets: Socket[],
    users: User[],
    usersDisconnected: User[],
    colors: string[],
    game: Game,
    timer: Timer
}

export interface Rooms {
   [key: string]: Room;
}
