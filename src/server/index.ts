import express from "express";
import {Server} from "socket.io";
import * as path from "path";
import {Room, Rooms} from "./types/rooms";
import { joinRoom } from "./actions/joinRoom";
import {createRoom} from "./actions/createRoom";
import {leaveRooms} from "./actions/leaveRooms";
import {ExtendedSocket} from "./types/socket";
import {nextRound} from "./actions/nextRound";
import {endTimer} from "./actions/endTimer";
import {sendPointsUser} from "./actions/sendPointsUser";
import {User} from "../store/user/types";
import {joinRoomGame} from "./actions/joinRoomGame";
import {endRoundEvent} from "./actions/endRoundEvent";
import {startGame} from "./actions/startGame";
import {getCard} from "./actions/getCard";
import {sendJoker} from "./actions/sendJoker";
import {sendDirt} from "./actions/sendDirt";
import {currentRound} from "./actions/currentRound";
import {Answer} from "./types/answer";

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 8080;
const io = process.env.NODE_ENV !== 'production' ? new Server(server, {cors: {origin: "*",}}) : new Server(server);

app.use(express.static(path.join(__dirname, '../../build')));
app.get("*", (req: any, res: any, next: any) => res.sendFile(path.join(__dirname, '../../build', 'index.html')));

const rooms:Rooms = {};

io.on("connect", (socket: ExtendedSocket) => {
    console.log(`connect ${socket.id}`);

    /**
     * Gets fired when a user wants to create a new room.
     */
    socket.on('createRoom', (username:string, callback) => {
        const room:Room = createRoom(rooms)
        rooms[room.id] = room;
        // have the socket join the room they've just created.
        joinRoom(username, io, socket, room);
        callback();
    });

    /**
     * Gets fired when a player has joined a room.
     */
    socket.on('joinRoom', (username:string, roomId:string, callback) => {
        const room:Room = rooms[roomId];
        if(room) {
            if(room.game.isStart) {
                joinRoomGame(username, io, socket, room)
            }
            else if(room.sockets.length < 6 || room.users.length < 6) joinRoom(username, io, socket, room);
            else socket.emit('error', "La room est complète");
        } else socket.emit('error', "La room n'existe pas");
        callback();
    });

    socket.on('userDisconnected', (roomId:string) => {
        const room: Room = rooms[roomId];
        if (room.usersDisconnected.length > 0) socket.emit('userDisconnected', true);
        else {
            room.users.sort((a, b) => (a.key > b.key) ? 1 : -1)
            socket.emit('userDisconnected', false);
            currentRound(room, io)
        }
    })

    socket.on('getListUsersInRoom', (roomId:string) => {
        const room:Room = rooms[roomId];
        if(room) {
            socket.emit('updateListUsers', room.users);
        }
    });

    socket.on('addJoker', (roomId:string, userKey:number) => {
        const room:Room = rooms[roomId];

        room.users[userKey].joker++;
    });

    socket.on('addDirt', (roomId:string, userKey:number) => {
        const room:Room = rooms[roomId];

        room.users[userKey].dirt++;
    });

    socket.on('sendPointsUser', (roomId:string, userKey:number, points:number) => {
        const room:Room = rooms[roomId];

        sendPointsUser(room.users[userKey], points)
    });

    /**
     * Gets fired when a host start a game in room.
     */
    socket.on('startGame', (roomId: string) => {
        const room:Room = rooms[roomId];
        startGame(room, io)
    });

    /**
     * Gets random card on click on Deck
     */
    socket.on('deckClicked', (roomId: string, playerKey: number) => {
        const room: Room = rooms[roomId];

        getCard(playerKey, room, io)
    });

    socket.on('sendJoker', (roomId: string, userKey: number, playerKey: number) => {
        const room: Room = rooms[roomId];
        sendJoker(userKey, playerKey, room, io);
    })

    socket.on('sendDirt', (roomId: string, userKey: number, playerKey: number) => {
        const room: Room = rooms[roomId];
        sendDirt(userKey, playerKey, room, io);
    })

    socket.on('nextRound', (roomId: string) => {
        const room:Room = rooms[roomId];
        nextRound(room, io)
    })

    socket.on('winRoundEvent', (roomId: string, userKey: number) => {
        const room:Room = rooms[roomId];

        if(room.users.filter(user => user.winEvent).length > 0) return
        room.users[userKey].winEvent = true
        //add statistics winOmg
        ++room.users[userKey].statisticsGame.omgWon
        socket.emit('winRoundEvent')
        socket.to(room.id).emit('loseRoundEvent')
    });

    socket.on('endRoundEvent', (roomId: string, userKey: number) => {
        const room:Room = rooms[roomId];
        room.users[userKey].winEvent = false
        endRoundEvent(room, io)
    });

    /**
     *
     */
    socket.on('sendAnswerGuess', (roomId: string, userKey: number, answer: Answer) => {
        const room:Room = rooms[roomId];

        room.users[userKey].answerEvent.myAnswer = answer
        room.users[userKey].answerEvent.send = true

        //check if all Users have send answer
        if(room.users.filter(user => !user.answerEvent.send).length === 0) endTimer(room, io)
    });

    socket.on('pushAnswersGuess', (roomId: string, userKey: number, answer:Answer) => {
        const room:Room = rooms[roomId];
        room.users[userKey].answerEvent.myAnswersUsers.push(answer)
        room.users[userKey].answerEvent.send = true

        //check if all Users have send answer
        if(room.users.filter(user => !user.answerEvent.send).length === 0) endTimer(room, io)
    })

    /**
     * Gets fired when a player leaves a room.
     */
    socket.on('leaveRoom', () => {
        leaveRooms(socket,rooms);
    });

    socket.on('logMySocket', () => {
        console.log('logMySocket:',socket)
    });

    socket.on('logRooms', () => {
        console.log('logRooms:',rooms)
    });

    socket.on("disconnect", () => {
        leaveRooms(socket,rooms);
        socket.emit('redirect', `/rooms/`);
        socket.emit('error', "Tu t'es déconnecté");
        console.log(`disconnect ${socket.id}`);
    });
});

server.listen(port);
