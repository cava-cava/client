"use strict";
exports.__esModule = true;
exports.joinRoom = void 0;
/**
 * Will connect a socket to a specified room
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
var joinRoom = function (socket, room) {
    room.sockets.push(socket);
    socket.join(room.id);
    console.log(socket.id, "Joined", room.id);
    socket.emit('redirect', "/rooms/" + room.id);
};
exports.joinRoom = joinRoom;
