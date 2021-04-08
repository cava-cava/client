import {Room} from "../types/rooms";
import {checkpoint} from "./checkpoint";
import {Server} from "socket.io";
import {startTimer} from "./startTimer";
import {endRoundEvent} from "./endRoundEvent";

/**
 * Get fired next step round event for game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function nextStepRoundEvent(room: Room,  io:Server) {
    room.users.map(user => user.answerEvent.send = false)
    checkpoint(room, io)
    if (room.game.guessEvent.trigger && !room.game.omgEvent.trigger) {
        if(room.game.guessEvent.idStep === -1) io.to(room.id).emit('startAnswersEvent')
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
