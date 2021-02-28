import {Rooms} from "../types/rooms";
import {ExtendedSocket} from "../types/socket";

/**
 * Will make the socket leave any rooms that it is a part of
 * @param socket A connected socket.io socket
 * @param rooms get all rooms
 */
export const leaveRooms = (socket:ExtendedSocket, rooms:Rooms) => {
    const roomsToDelete = [];
    for(const id in rooms) {
        const room = rooms[id];
        // check to see if the socket is in the current room
        if (room.sockets.includes(socket)) {
            socket.leave(id);
            // remove the socket from the room object
            room.sockets = room.sockets.filter((item) => item !== socket);
            // remove the user from the room object
            room.users = room.users.filter((user) => user.id !== socket.id);
            socket.to(room.id).emit('updateUsers', room.users);
        }
        // Prepare to delete any rooms that are now empty
        if (room.sockets.length == 0) {
            roomsToDelete.push(room);
        }
    }

    // Delete all the empty rooms that we found earlier
    for (const room of roomsToDelete) {
        delete rooms[room.id];
    }
};
