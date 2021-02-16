import express from "express";
import {Socket, Server} from "socket.io";
import * as path from "path";
import { nanoid } from 'nanoid'
import {Room, Rooms} from "./types/rooms";
import { joinRoom } from "./actions/joinRoom";

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 8080;
const io = process.env.NODE_ENV !== 'production' ? new Server(server, {cors: {origin: "*",}}) : new Server(server);

app.use(express.static(path.join(__dirname, '../../build')));
app.get("*", (req: any, res: any, next: any) => res.sendFile(path.join(__dirname, '../../build', 'index.html')));

const rooms:Rooms = {};

io.on("connect", (socket: Socket) => {
    console.log(`connect ${socket.id}`);

    /**
     * Gets fired when a user wants to create a new room.
     */
    socket.on('createRoom', (callback) => {
        const room = {
            id: nanoid(5),
            sockets: []
        };
        rooms[room.id] = room;
        console.log(rooms)
        // have the socket join the room they've just created.
        joinRoom(socket, room);
        callback();
    });

    /**
     * Gets fired when a player has joined a room.
     */
    socket.on('joinRoom', (roomId:string, callback) => {
        const room:Room = rooms[roomId];
        joinRoom(socket, room);
        callback();
    });


    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});

server.listen(port);
