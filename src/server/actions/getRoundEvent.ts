import {Room} from "../types/rooms";
import {Server} from "socket.io";

export function getRoundEvent(room: Room, io: Server) {
    io.to(room.id).emit('startRoundEvent', room.game.guessEvent.trigger, room.game.omgEvent.trigger);
    if (room.game.guessEvent.trigger && !room.game.omgEvent.trigger) {
        io.to(room.id).emit('sendGuess', room.game.guessEvent.guess)
        if (room.game.guessEvent.idStep !== -1 && room.game.guessEvent.idStep < room.users.length) {
            io.to(room.id).emit('startAnswersEvent')
        }
    }
    if (!room.game.guessEvent.trigger && room.game.omgEvent.trigger) {
        io.to(room.id).emit('sendOmg', room.game.omgEvent.omg)
    }
}
