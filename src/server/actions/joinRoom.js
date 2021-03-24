"use strict";
exports.__esModule = true;
exports.joinRoom = void 0;
/**
 * Will connect a socket to a specified room
 * @param username string
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
var joinRoom = function (username, socket, room) {
    socket.username = username;
    var color = room.colors[0];
    socket.color = color;
    room.colors.shift();
    var user = {
        id: socket.id,
        name: username,
        color: color
    };
    room.users.push(user);
    room.sockets.push(socket);
    socket.join(room.id);
    console.log(socket.username + "[" + socket.id + "] Joined " + room.id);
    socket.emit('redirect', "/rooms/" + room.id);
    socket.to(room.id).emit('updateUsers', room.users);
};
exports.joinRoom = joinRoom;
