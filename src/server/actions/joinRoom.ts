import {Room} from "../types/rooms";
import {ExtendedSocket} from "../types/socket";
import {User} from "../../store/user/types";
import {Server} from "socket.io";

/**
 * Will connect a socket to a specified room
 * @param username string
 * @param avatar string
 * @param io A connected socket.io server
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
export const joinRoom = (username:string, avatar:string, io:Server, socket:ExtendedSocket, room:Room) => {
    socket.username = username
    socket.avatar = avatar
    const color = room.colors[0]
    socket.color = color
    room.colors.shift()
    const user:User = {
        key: -1,
        id: socket.id,
        name: username,
        color: color,
        avatar: avatar,
        ladder: 1,
        points: 0,
        joker: 2,
        dirt: 2,
        winEvent: false,
        winOmg: false,
        answerEvent: {
            myAnswer: {
                userKey: -1,
                answer: ''
            },
            myAnswersUsers: [],
            allAnswersUserKey: [],
            send: false,
            winEvent: false
        },
        statisticsGame: {
            bonus: 0,
            malus: 0,
            useJoker: 0,
            useJokerForMe: 0,
            useJokerForOther: 0,
            useDirt: 0,
            guessWon: 0,
            guessLost: 0,
            omgWon: 0
        },
        gameOver: []
    };
    room.users.push(user);
    room.sockets.push(socket);
    socket.join(room.id);
    console.log(`${socket.username}[${socket.id}] Joined ${room.id}`);
    socket.emit('redirect', `/rooms/${room.id}`);
    io.to(room.id).emit('updateListUsers', room.users);
};
