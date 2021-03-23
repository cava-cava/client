import {Room, Rooms} from "../types/rooms";
import {nanoid} from "nanoid";


/**
 * Create and generate nanoid for connect a socket to a room
 * @param rooms An Array of room
 */
export function createRoom(rooms: Rooms) {
    let room: Room = {
        id: nanoid(5),
        sockets: [],
        users: [],
        colors: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
    }
    while (rooms[room.id] || !room?.id) {
        room.id = nanoid(5);
    }
    return room
}
