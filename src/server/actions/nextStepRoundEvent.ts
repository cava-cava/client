import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {startTimer} from "./startTimer";
import {endRoundEvent} from "./endRoundEvent";
import {sendAnswerGuess} from "./sendAnswerGuess";
import {Answer} from "../types/answer";
import {pushAnswersGuess} from "./pushAnswersGuess";
import {shuffle} from "../../mixins/shuffle";

/**
 * Get fired next step round event for game room
 * @param room An object that represents a room from the `rooms` instance variable object
 * @param io A connected socket.io server
 */
export function nextStepRoundEvent(room: Room,  io:Server) {
    if (room.game.guessEvent.trigger && !room.game.omgEvent.trigger) {
        if(room.game.guessEvent.idStep === -1) {
            room.users.map(user => user.answerEvent.send = false)
            // build allAnswers with userKey for startAnswersEvent
            const allUsersKey:number[] = []
            room.users.map((user) => {
                allUsersKey.push(user.key)
            })
            room.users.map((user) => {
                user.answerEvent.allAnswersUserKey = shuffle(allUsersKey.filter(userKey => userKey !== user.key))
            })

            // Check if each user have send answer
            room.users.map((user) => {
                if(!user.answerEvent.myAnswer.answer || user.answerEvent.myAnswer.answer.length === 0) {
                    const answer:Answer= {
                        userKey: user.key,
                        myAnswerKey: user.key,
                        answer: `-`
                    }
                    sendAnswerGuess(room, user.key, answer, io, false)
                    room.users.map((u) => {
                        if(u.key !== user.key) pushAnswersGuess(room, u, answer, io)
                    })
                }
            })
            //check if all Users have send answer
            if(room.users.filter(user => !user.answerEvent.send).length === 0) room.game.guessEvent.idStep = 0
        }
        ++room.game.guessEvent.idStep;
        if(room.game.guessEvent.idStep === 0) {
            io.to(room.id).emit('startAnswersEvent')
            startTimer(room, io, 40)
            room.users.map((user) => {
                if(user.answerEvent.allAnswersUserKey.length > 0) {
                    io.to(user.id).emit('message', `Qu'est-ce qu'à répondu ${room.users[user.answerEvent.allAnswersUserKey[0]].name} ?`)
                } else io.to(user.id).emit('message', '')
            })
        } else if(room.game.guessEvent.idStep === 1) {
            io.to(room.id).emit('showResultsAnswersEvent')
            startTimer(room, io, 8)

            //Check Winners
            room.users.map((user) => {
                let winEvent = true
                if(!user.answerEvent.send || user.answerEvent.myAnswer.answer === `-`){
                    winEvent = false
                    io.to(user.id).emit('message', `Tu as perdu... Tu n'as pas répondu au devine qui ...`)
                } else {
                    user.answerEvent.myAnswersUsers.map((myAnswerUser) => {
                        if(myAnswerUser.myAnswerKey !== myAnswerUser.userKey) {
                            if(winEvent) {
                                winEvent = false
                                io.to(user.id).emit('message', `Tu as perdu ...`)
                            }
                            ++user.statisticsGame.guessLost
                        }
                    })
                }
                if(winEvent) {
                    user.answerEvent.winEvent = winEvent
                    io.to(user.id).emit('message', `Tu as gagné !`)
                    //add statistics guessWon
                    ++user.statisticsGame.guessWon
                }
            })
            room.users.map(user => user.answerEvent.send = false)
        } else if(room.game.guessEvent.idStep === 2 && room.users.filter(user => user.answerEvent.winEvent).length > 0) {
            room.users.map(user => {
                if(!user.answerEvent.winEvent) io.to(user.id).emit('loseRoundEvent')
                else {
                    user.winEvent = true
                    io.to(user.id).emit('winRoundEvent')
                }
            })
        }
        else {
            endRoundEvent(room, io)
        }
    } else if (!room.game.guessEvent.trigger && room.game.omgEvent.trigger) {
        console.log(room.game.omgEvent.idStep)
        if (room.game.omgEvent.idStep === 0) {
            startTimer(room, io, 3)
        } else if (room.game.omgEvent.idStep === 1 && room.users.filter(user => user.winOmg).length > 0) {
            room.users.map(user => {
                if(!user.winOmg) io.to(user.id).emit('loseRoundEvent')
                else {
                    user.winEvent = true
                    io.to(user.id).emit('winRoundEvent')
                }
            })
        } else {
            endRoundEvent(room, io)
        }
        ++room.game.omgEvent.idStep
    }
    //update list users
    io.to(room.id).emit('updateListUsers', room.users);
}
