"use strict";
exports.__esModule = true;
exports.createRoom = void 0;
var nanoid_1 = require("nanoid");
/**
 * Create and generate nanoid for connect a socket to a room
 * @param rooms An Array of room
 */
function createRoom(rooms) {
    var room = {
        id: nanoid_1.nanoid(5),
        sockets: [],
        users: [],
        colors: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
        game: {
            points: 100,
            round: 0,
            idUser: 0,
            isStart: false
        }
    };
    while (rooms[room.id] || !(room === null || room === void 0 ? void 0 : room.id)) {
        room.id = nanoid_1.nanoid(5);
    }
    return room;
}
exports.createRoom = createRoom;
