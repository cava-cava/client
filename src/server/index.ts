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
import {shuffle} from "../mixins/shuffle";
import {sendAnswerGuess} from "./actions/sendAnswerGuess";
import {startTimer} from "./actions/startTimer";
import {stopTimer} from "./actions/stopTimer";
import {pushAnswersGuess} from "./actions/pushAnswersGuess";
import React from "react";
import {nextStepRoundEvent} from "./actions/nextStepRoundEvent";
import {winOmg} from "./actions/winOmg";
import {getRoundEvent} from "./actions/getRoundEvent";
import {checkpoint} from "./actions/checkpoint";
import {getPlayer} from "./actions/getPlayer";
import {progressBar} from "./actions/progressBar";

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
    socket.on('createRoom', (username:string, avatar: string, callback) => {
        const room:Room = createRoom(rooms)
        rooms[room.id] = room;
        // have the socket join the room they've just created.
        joinRoom(username, avatar, io, socket, room);
        callback();
    });

    /**
     * Gets fired when a player has joined a room.
     */
    socket.on('joinRoom', (username:string, avatar: string, roomId:string, callback) => {
        const room:Room = rooms[roomId];
        if(room) {
            if(room.game.isStart) {
                joinRoomGame(username, avatar, io, socket, room)
            }
            else if(room.sockets.length < 6 || room.users.length < 6) joinRoom(username, avatar, io, socket, room);
            else socket.emit('message', "La partie est complète...");
        } else socket.emit('message', "La partie n'existe pas...");
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

    socket.on('isReady', (roomId:string, userKey:number) => {
        const room:Room = rooms[roomId];

        if(room) {
            room.users[userKey].isReady = true
            checkpoint(room, io)
            if(room.users.filter(user => user.isReady).length === room.users.length) {
                getPlayer(room,io)
            }
        }
    });

    socket.on('getListUsersInRoom', (roomId:string) => {
        const room:Room = rooms[roomId];
        if(room) {
            socket.emit('updateListUsers', room.users);
        }
    });

    socket.on('getListUsersDisconnectedInRoom', (roomId:string) => {
        const room:Room = rooms[roomId];
        if(room) {
            socket.emit('updateListUsersDisconnected', room.usersDisconnected);
        }
    });

    socket.on('addJoker', (roomId:string, userKey:number) => {
        const room:Room = rooms[roomId];

        room.users[userKey].joker++;
        progressBar(room.users[userKey], `+1 Oh ça va`)
    });

    socket.on('addDirt', (roomId:string, userKey:number) => {
        const room:Room = rooms[roomId];

        room.users[userKey].dirt++;
        progressBar(room.users[userKey], `+1 Cheh`)
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

    socket.on('winOmg', (roomId: string, userKey: number) => {
        const room:Room = rooms[roomId];
        const user = room.users[userKey]
        if(room.users.filter(user => user.winOmg).length > 0 || room.game.omgEvent.win) return
        user.winOmg = true
        room.game.omgEvent.win = true
        //add statistics winOmg
        ++user.statisticsGame.omgWon
        winOmg(room.id, user.id, socket, io)
        nextStepRoundEvent(room, io)
    });

    socket.on('checkWinOmg', (roomId: string, userKey: number) => {
        const room:Room = rooms[roomId];
        const user = room.users[userKey]
        if(user && user.winOmg && room.game.omgEvent.win) {
            winOmg(room.id, user.id, socket, io)
        }
    });

    socket.on('checkWinRoundEvent', (roomId: string, userKey: number) => {
        const room:Room = rooms[roomId];
        const user:User = room.users[userKey]

        if(!user || room.users.filter(user => user.winEvent).length === 0) return
        if(user.winEvent) {
            io.to(user.id).emit('winRoundEvent')
         }else io.to(user.id).emit('loseRoundEvent')
    });

    socket.on('endRoundEvent', (roomId: string, userKey: number) => {
        const room:Room = rooms[roomId];
        room.users[userKey].winEvent = false
        if(room.game.omgEvent.win) room.users[userKey].winOmg = false
        endRoundEvent(room, io)
    });

    socket.on('getRoundEvent', (roomId: string) => {
        const room:Room = rooms[roomId];
        getRoundEvent(room, io)
    });

    socket.on('getAnswers', (roomId: string, userKey: number) => {
        const room:Room = rooms[roomId];
        const user:User = room.users[userKey]
        const answers:Answer[] = room.game.guessEvent.answers.filter(answer => answer.userKey !== userKey)
        io.to(user.id).emit('getAnswers', shuffle(answers))
    });

    socket.on('sendAnswerGuess', (roomId: string, userKey: number, answer: Answer) => {
        const room:Room = rooms[roomId];

        sendAnswerGuess(room, userKey, answer, io)

        //check if all Users have send answer
        if(room.users.filter(user => !user.answerEvent.send).length === 0) endTimer(room, io)
    });

    socket.on('pushAnswersGuess', (roomId: string, userKey: number, answer:Answer) => {
        const room:Room = rooms[roomId];
        const user:User = room.users[userKey]

        pushAnswersGuess(room, user, answer, io)

        io.to(room.id).emit('updateListUsers', room.users);

        if(user.answerEvent.allAnswersUserKey.length > 0) {
            socket.emit('message', `Qu'est-ce qu'à répondu ${room.users[user.answerEvent.allAnswersUserKey[0]].name} ?`)
        } else socket.emit('message', '')

        //check if all Users have send answer
        if(room.users.filter(user => !user.answerEvent.send).length === 0) endTimer(room, io)
    })

    socket.on('send', (roomId: string, userKey: number) => {
        const room:Room = rooms[roomId];
        const user:User = room.users[userKey]
        io.to(user.id).emit('send', user.answerEvent.send)
    })

    /**
     * Gets fired when a player leaves a room.
     */
    socket.on('leaveRoom', () => {
        leaveRooms(socket,rooms);
    });

    socket.on('startTimer', (roomId:string) => {
        const room:Room = rooms[roomId];
        if(room.game.cardGame.card || room.game.guessEvent.guess) startTimer(room, io)
    });

    socket.on('stopTimer', (roomId:string) => {
        const room:Room = rooms[roomId];
        stopTimer(room)
    });

    socket.on("disconnect", () => {
        leaveRooms(socket,rooms);
        socket.emit('redirect', `/rooms/`);
        socket.emit('message', "Tu t'es déconnecté...");
        console.log(`disconnect ${socket.id}`);
    });
});

server.listen(port);
