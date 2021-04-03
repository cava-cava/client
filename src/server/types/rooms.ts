import {Socket} from "socket.io";
import {User} from "../../store/user/types";
import {Game} from "./game";

export interface Room {
    id: string,
    sockets: Socket[],
    users: User[],
    usersDisconnected: User[],
    colors: string[],
    game: Game
}

export interface Rooms {
   [key: string]: Room;
}
