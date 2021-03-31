import express from "express";
import {Server} from "socket.io";
import * as path from "path";
import {Room, Rooms} from "./types/rooms";
import { joinRoom } from "./actions/joinRoom";
import {createRoom} from "./actions/createRoom";
import {leaveRooms} from "./actions/leaveRooms";
import {ExtendedSocket} from "./types/socket";
import axios from "axios";
import {initIdOMG} from "./actions/initOMG";
import {shuffle} from "../mixins/shuffle";
import {getPlayer} from "./actions/getPlayer";
import {nextRound} from "./actions/nextRound";
import {checkpoint} from "./actions/checkpoint";
import {endTimer} from "./actions/endTimer";
import {startTimer} from "./actions/startTimer";

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
            if(room.game.isStart) socket.emit('error', "La room est en plein jeu");
            else if(room.sockets.length < 6 || room.users.length < 6) joinRoom(username, io, socket, room);
            else socket.emit('error', "La room est complète");
        }
        else socket.emit('error', "La room n'existe pas");
        callback();
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

        room.users[userId].points+= points;
        if(room.users[userId].points < 0)  room.users[userId].points = 0
    });

    /**
     * Gets fired when a host start a game in room.
     */
    socket.on('startGame', async (roomId: string) => {
        const room:Room = rooms[roomId];

        //Initialize cards for the game
        await axios.get('https://happiness-strapi.herokuapp.com/cards').then(({data}) => {
            room.game.cards = shuffle(data)
        })

        //Initialize guesses for the game
        await axios.get('https://happiness-strapi.herokuapp.com/guesses').then(({data}) => {
            room.game.guesses = shuffle(data)
        })

        if(room.game.guesses && room.game.guesses.length > 0) room.game.idGuesses = 0

        //Init Key of users
        room.users.map((user,index) => room.users[index].key = index)

        //Initialize OMG for the game
        room.game.idOMG = initIdOMG(room)

        room.game.isStart = true
        io.to(room.id).emit('redirect', `/game/${roomId}`);
        checkpoint(room, io)
        getPlayer(room, io)
    });

    /**
     * Gets random card on click on Deck
     */
    socket.on('getCard', (roomId: string) => {
        const room:Room = rooms[roomId];

        if(room.game.timerRunning) return;

        let pickedCard;
        if(room.game.cards) {
            pickedCard = room.game.cards[0]
        }

        io.to(room.id).emit('getCard', pickedCard)
        startTimer(room, io, 15)
    });

    socket.on('endTimer', (roomId: string, userId: number) => {
        const room:Room = rooms[roomId];
        if(!room && userId !== 0 ) {
            //isHost
            return
        }
        endTimer(room, io, userId)
    })


    socket.on('nextRound', (roomId: string) => {
        const room:Room = rooms[roomId];

        nextRound(room, io)
    })

    socket.on('winRoundEvent', (roomId: string) => {
        const room:Room = rooms[roomId];

        socket.emit('winRoundEvent')
        socket.to(room.id).emit('loseRoundEvent')
    });

    socket.on('endRoundEvent', (roomId: string) => {
        const room:Room = rooms[roomId];

        if(room.game.triggerGuesses) {
            room.users.map(user => user.answerGuess = '')
            room.game.triggerGuesses = false
            room.game.idUser = -1
        }

        if(room.game.triggerOMG) {
            room.game.triggerOMG = false
            //Re-initialize OMG for the game
            room.game.idOMG = initIdOMG(room)
        }

        io.to(room.id).emit('endRoundEvent')

        nextRound(room, io)
    });

    /**
     *
     */
    socket.on('sendAnswerGuess', (roomId: string, userId: number, answer: string) => {
        const room:Room = rooms[roomId];

        room.users[userId].answerGuess = answer
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
        console.log(`disconnect ${socket.id}`);
    });
});

server.listen(port);
