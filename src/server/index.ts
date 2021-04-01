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
import {sendPointsUser} from "./actions/sendPointsUser";
import {Card} from "./types/card";

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
    socket.on('deckClicked', (roomId: string, playerId: number) => {
        const room: Room = rooms[roomId];

        if (room.game.timerRunning || !room.game.cards) return;
        if (++room.game.idCards >= room.game.cards.length) room.game.idCards = 0
        room.game.showAlternative = false
        const pickedCard: Card = room.game.cards[room.game.idCards];
        sendPointsUser(room.users[playerId], pickedCard.Points)
        checkpoint(room, io)
        io.to(room.id).emit('pickedCard', pickedCard)
        startTimer(room, io, 5)
    });

    socket.on('sendJoker', (roomId: string, userId: number, playerId: number ) => {
        const room: Room = rooms[roomId];

        if (!room.game.timerRunning || !room.game.cards) return;

        if(--room.users[userId].joker < 0) room.users[userId].joker = 0

        const pickedCard: Card = room.game.cards[room.game.idCards];
        let alternativeCard: Card = pickedCard.Alternative[0];
        alternativeCard.Points = Math.abs(pickedCard.Points)

        if(!room.game.showAlternative) {
            room.game.showAlternative = true
        }else {
            alternativeCard.Description = "OH CA VA, JE M'EN BLC"
        }
        sendPointsUser(room.users[playerId], alternativeCard.Points)
        if(playerId !== userId) sendPointsUser(room.users[userId], alternativeCard.Points)
        checkpoint(room, io)
        io.to(room.id).emit('pickedCard', alternativeCard)
        startTimer(room, io, 5)
    })

    socket.on('sendDirt', (roomId: string, userId: number, playerId: number) => {
        const room: Room = rooms[roomId];

        if (!room.game.timerRunning || !room.game.cards) return;

        if(--room.users[userId].dirt < 0) room.users[userId].dirt = 0

        const pickedCard: Card = room.game.cards[room.game.idCards];
        let alternativeCard: Card = pickedCard.Alternative[0];
        alternativeCard.Points = -Math.abs(pickedCard.Points)

        if(!room.game.showAlternative) {
            room.game.showAlternative = true
        }else {
            alternativeCard.Description = "OH CA VA PAS, ON SE MOQUE DE MOI :'("
        }
        sendPointsUser(room.users[playerId], alternativeCard.Points)
        checkpoint(room, io)
        io.to(room.id).emit('pickedCard', alternativeCard)
        startTimer(room, io, 5)
    })

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

    socket.on('endRoundEvent', (roomId: string, userId: number) => {
        const room:Room = rooms[roomId];

        room.users[userId].winBooty = false
        if(room.users.filter(user => user.winBooty).length > 0) return

        if(room.game.triggerGuesses) {
            room.game.idStepGuess = -1
            room.users.map(user => user.answerGuess = '')
            room.game.triggerGuesses = false
            room.game.idUser = -1
            if(++room.game.idGuesses < room.users.length) room.game.idGuesses = 0
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
