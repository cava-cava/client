import {Room} from "../types/rooms";
import {Server} from "socket.io";

/**
 * Get fired for get player in game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function getUserAnswersEvent(room: Room, io:Server) {
    room.users.map((user) => {
        if(user.answerEvent.allAnswersUserKey.length > 0) {
            io.to(user.id).emit('message', `Qu'est-ce qu'à répondu ${room.users[user.answerEvent.allAnswersUserKey[0]].name} ?`)
        } else io.to(user.id).emit('message', '')
    })
}
