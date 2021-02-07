import express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 8080;
const io = process.env.NODE_ENV !== 'production' ? require("socket.io")(server, {cors: {origin: "*",}}) : require("socket.io")(server);

app.use(express.static(path.join(__dirname, '../../build')));
app.get("/", (req: any, res: any, next: any) => res.sendFile(__dirname + './index.html'));

// sockets test
io.on('connection', (socket: any) => socket.emit('hello', 'hello from server!'));

server.listen(port);
