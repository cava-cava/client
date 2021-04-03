import {Room} from "../types/rooms";
import {checkpoint} from "./checkpoint";
import {Server} from "socket.io";
import {startTimer} from "./startTimer";
import {ExtendedSocket} from "../types/socket";
import {nextRound} from "./nextRound";
import {endRoundEvent} from "./endRoundEvent";

/**
 * Get fired next step round event for game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function nextStepRoundEvent(room: Room,  io:Server) {
    checkpoint(room, io)
    if (room.game.triggerGuesses && !room.game.triggerOMG) {
        if(room.game.idStepGuess === -1) io.to(room.id).emit('startAnswersEvent')
        if(++room.game.idStepGuess < room.users.length) {
            io.to(room.id).emit('nextStepRoundEvent', room.game.idStepGuess)
            startTimer(room, io, 10)
        }
        else {
            room.users.map(user => {
                const goodAnswers = user.answersGuess.filter((userAnswerGuess, index) => userAnswerGuess.answerGuess === room.users[index].answerGuess)
                if(room.users.length === goodAnswers.length) {
                    user.winBooty = true
                    io.to(user.id).emit('winRoundEvent')
                }
            })
            const loseBootyUsers = room.users.filter(user => !user.winBooty)
            if(loseBootyUsers.length === room.users.length) {
                endRoundEvent(room, io)
            }else {
                loseBootyUsers.map(user => {
                    io.to(user.id).emit('loseRoundEvent')
                })
            }
        }
    }
}
