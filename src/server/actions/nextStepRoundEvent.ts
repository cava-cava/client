import {Room} from "../types/rooms";
import {checkpoint} from "./checkpoint";
import {Server} from "socket.io";
import {startTimer} from "./startTimer";
import {endRoundEvent} from "./endRoundEvent";
import {sendAnswerGuess} from "./sendAnswerGuess";
import {Answer} from "../types/answer";

/**
 * Get fired next step round event for game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function nextStepRoundEvent(room: Room,  io:Server) {
    checkpoint(room, io)
    if (room.game.guessEvent.trigger && !room.game.omgEvent.trigger) {
        if(room.game.guessEvent.idStep === -1) {
            room.users.map((user) => {
                if(!user.answerEvent.myAnswer.answer || user.answerEvent.myAnswer.answer.length === 0) {
                    const answer:Answer= {
                        userKey: user.key,
                        answer: `Pas de reponse - ${user.name}`
                    }
                    sendAnswerGuess(room, user.key, answer)
                }
            })
            io.to(room.id).emit('startAnswersEvent')
        }
        room.users.map(user => user.answerEvent.send = false)
        if(++room.game.guessEvent.idStep < (room.users.length - 1)) {
            io.to(room.id).emit('nextStepRoundEvent', room.game.guessEvent.idStep)
            startTimer(room, io, 10)
        }
        else {
            room.users.map((user) => {
                let winEvent = true
                if(user.answerEvent.myAnswersUsers.length !== (room.users.length + room.usersDisconnected.length)){
                    winEvent = false
                } else {
                    user.answerEvent.myAnswersUsers.map((answer) => {
                        if(answer.idStep && answer.answer !== room.users[answer.idStep].answerEvent.myAnswer.answer) {
                            winEvent = false
                            return;
                        }
                    })
                }
                if(winEvent) {
                    user.winEvent = winEvent
                    //add statistics guessWon
                    ++user.statisticsGame.guessWon
                    io.to(user.id).emit('winRoundEvent')
                }
            })
            const loseBootyUsers = room.users.filter(user => !user.winEvent)
                loseBootyUsers.map(user => {
                    io.to(user.id).emit('loseRoundEvent')
                })
            if(loseBootyUsers.length === room.users.length) {
                setTimeout(() => endRoundEvent(room, io), 3000)
            }
        }
    }
}
