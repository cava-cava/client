import {Socket} from "socket.io";

export interface ExtendedSocket extends Socket {
    key: number
    username: string
    avatar: string
    color: string
}
