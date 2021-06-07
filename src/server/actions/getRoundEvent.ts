import {Room} from "../types/rooms";
import {Server} from "socket.io";
import {getUserAnswersEvent} from "./getUserAnswersEvent";

export function getRoundEvent(room: Room, io: Server) {
    io.to(room.id).emit('startRoundEvent', room.game.guessEvent.trigger, room.game.omgEvent.trigger);
    if (room.game.guessEvent.trigger && !room.game.omgEvent.trigger) {
        io.to(room.id).emit('sendGuess', room.game.guessEvent.guess)
        if (room.game.guessEvent.idStep !== -1 && room.game.guessEvent.idStep < room.users.length) {
            io.to(room.id).emit('startAnswersEvent')
            if (room.game.guessEvent.idStep === 0) {
                getUserAnswersEvent(room, io)
            } else if (room.game.guessEvent.idStep === 1) {
                io.to(room.id).emit('showResultsAnswersEvent')
                room.users.map((user) => {
                    if (user.answerEvent.myAnswer.answer === `-`) {
                        io.to(user.id).emit('message', `Tu as perdu... Tu n'as pas répondu au devine qui ...`)
                    } else {
                        if (user.answerEvent.winEvent) io.to(user.id).emit('message', `Tu as gagné !`)
                        else io.to(user.id).emit('message', `Tu as perdu ...`)
                    }
                })
            }
        }
    }
    if (!room.game.guessEvent.trigger && room.game.omgEvent.trigger) {
        io.to(room.id).emit('sendOmg', room.game.omgEvent.omg)
        if(room.users.filter(user => user.winOmg).length > 0 && room.game.omgEvent.win) {
            room.users.map((user) => {
                if(user.winOmg) io.to(user.id).emit('message', "Bravo ! Tu as gagné !");
                else io.to(user.id).emit('message', "Tu as perdu...");
            })
        }
    }
}
