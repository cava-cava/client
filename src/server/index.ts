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
import {Card} from "./types/card";
import {User} from "../store/user/types";
import {joinRoomGame} from "./actions/joinRoomGame";
import {endRoundEvent} from "./actions/endRoundEvent";
import {sendCard} from "./actions/sendCard";
import {startGame} from "./actions/startGame";

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
        else socket.emit('userDisconnected', false);
    })

    socket.on('getListUsersInRoom', (roomId:string) => {
        const room:Room = rooms[roomId];
        if(room) {
            socket.emit('updateListUsers', room.users);
        }
    });

    socket.on('addJoker', (roomId, userId) => {
        const room:Room = rooms[roomId];

        room.users[userId].joker++;
    });

    socket.on('addDirt', (roomId, userId) => {
        const room:Room = rooms[roomId];

        room.users[userId].dirt++;
    });

    socket.on('sendPointsUser', (roomId, userId, points) => {
        const room:Room = rooms[roomId];

        sendPointsUser(room.users[userId], points)
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
    socket.on('deckClicked', (roomId: string, playerId: number) => {
        const room: Room = rooms[roomId];

        if (room.timer.isRunning || !room.game.cards) return;
        if (++room.game.cardGame.id >= room.game.cards.length) room.game.cardGame.id = 0
        room.game.cardGame.showAlternative = false
        const pickedCard: Card = room.game.cards[room.game.cardGame.id];
        sendCard(playerId, pickedCard, room, io)
    });

    socket.on('sendJoker', (roomId: string, userId: number, playerId: number ) => {
        const room: Room = rooms[roomId];

        if (!room.timer.isRunning || !room.game.cards || room.users[userId].joker <= 0) return;

        if(--room.users[userId].joker < 0) room.users[userId].joker = 0

        const pickedCard: Card = room.game.cards[room.game.cardGame.id];
        let alternativeCard: Card = pickedCard.Alternative[0];
        alternativeCard.Points = Math.abs(pickedCard.Points)

        if(!room.game.cardGame.showAlternative) {
            room.game.cardGame.showAlternative = true
        }else {
            alternativeCard.Description = "OH CA VA, JE M'EN BLC"
        }
        if(playerId !== userId) sendPointsUser(room.users[userId], alternativeCard.Points)
        sendCard(playerId, alternativeCard, room, io)
    })

    socket.on('sendDirt', (roomId: string, userId: number, playerId: number) => {
        const room: Room = rooms[roomId];

        if (!room.timer.isRunning || !room.game.cards || room.users[userId].dirt <= 0) return;

        if(--room.users[userId].dirt < 0) room.users[userId].dirt = 0

        const pickedCard: Card = room.game.cards[room.game.cardGame.id];
        let alternativeCard: Card = pickedCard.Alternative[0];
        alternativeCard.Points = -Math.abs(pickedCard.Points)

        if(!room.game.cardGame.showAlternative) {
            room.game.cardGame.showAlternative = true
        }else {
            alternativeCard.Description = "OH CA VA PAS, ON SE MOQUE DE MOI :'("
        }
        sendCard(playerId, alternativeCard, room, io)
    })

    socket.on('nextRound', (roomId: string) => {
        const room:Room = rooms[roomId];

        nextRound(room, io)
    })

    socket.on('pushAnswersGuess', (roomId: string, userId: number, user: User) => {
        const room:Room = rooms[roomId];

        room.users[userId].answerEvent.myAnswersUsers.push(user)
    })

    socket.on('winRoundEvent', (roomId: string, userId: number) => {
        const room:Room = rooms[roomId];

        if(room.users.filter(user => user.winEvent).length > 0) return
        room.users[userId].winEvent = true
        socket.emit('winRoundEvent')
        socket.to(room.id).emit('loseRoundEvent')
    });

    socket.on('endRoundEvent', (roomId: string, userId: number) => {
        const room:Room = rooms[roomId];
        room.users[userId].winEvent = false
        endRoundEvent(room, io)
    });

    /**
     *
     */
    socket.on('sendAnswerGuess', (roomId: string, userId: number, answer: string) => {
        const room:Room = rooms[roomId];

        room.users[userId].answerEvent.myAnswer = answer

        //check if all Users have answer
        if(room.users.filter(user => !user.answerEvent.myAnswer || user.answerEvent.myAnswer.length === 0).length === 0) endTimer(room, io)
    });

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
