import {Room} from "../types/rooms";
import {ExtendedSocket} from "../types/socket";
import {getPlayer} from "./getPlayer";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param socket A connected socket.io socket
 */

export function nextRound(room: Room, socket:ExtendedSocket) {
    room.game.round++
    if(room.game.round === room.game.idOMG) {
        socket.emit('startOMG');
        socket.to(room.id).emit('startOMG');
    }else {
        if(++room.game.idUser >= room.users.length) {
            console.log('envoyer un event guesses/devine qui')
            room.game.idUser = 0
        }
        getPlayer(room, socket)
    }
}
