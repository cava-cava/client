import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {initIdOMG} from "./initOMG";
import {nextRound} from "./nextRound";
import {checkpoint} from "./checkpoint";

/**
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function endRoundEvent(room: Room, io: Server) {
    io.to(room.id).emit('updateListUsers', room.users);
    if (room.users.filter(user => user.winEvent).length > 0) return

    if (room.game.guessEvent.trigger) {
        // reset guessEvent
        room.game.guessEvent = {
            id: (room.game.guesses && ++room.game.guessEvent.id >= room.game.guesses.length) ? 0 : room.game.guessEvent.id,
            answers: [],
            trigger: false,
            idStep: -1
        }
        // reset answerEvent user
        room.users.map(user => {
            user.answerEvent = {
                myAnswer: {
                    userKey: -1,
                    answer: ''
                },
                myAnswersUsers: [],
                allAnswersUserKey: [],
                send: false,
                winEvent: false
            }
        })
        // reset player id
        room.game.playerGame.id = -1
    }

    if (room.game.omgEvent.trigger) {
        room.game.omgEvent.trigger = false
        //Re-initialize OMG for the game
        room.game.omgEvent.id = initIdOMG(room)
    }

    io.to(room.id).emit('endRoundEvent')

    nextRound(room, io)
}
