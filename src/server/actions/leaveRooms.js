"use strict";
exports.__esModule = true;
exports.leaveRooms = void 0;
/**
 * Will make the socket leave any rooms that it is a part of
 * @param socket A connected socket.io socket
 * @param rooms get all rooms
 */
var leaveRooms = function (socket, rooms) {
    var roomsToDelete = [];
    for (var id in rooms) {
        var room = rooms[id];
        // check to see if the socket is in the current room
        if (room.sockets.includes(socket)) {
            socket.leave(id);
            // remove the socket from the room object
            room.sockets = room.sockets.filter(function (item) { return item !== socket; });
            // remove the user from the room object
            room.users = room.users.filter(function (user) { return user.id !== socket.id; });
            socket.to(room.id).emit('updateUsers', room.users);
        }
        // Prepare to delete any rooms that are now empty
        if (room.sockets.length == 0) {
            roomsToDelete.push(room);
        }
    }
    // Delete all the empty rooms that we found earlier
    for (var _i = 0, roomsToDelete_1 = roomsToDelete; _i < roomsToDelete_1.length; _i++) {
        var room = roomsToDelete_1[_i];
        delete rooms[room.id];
    }
};
exports.leaveRooms = leaveRooms;
