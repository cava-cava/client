import {Room} from "../types/rooms";
import {Answer} from "../types/answer";
import {Server} from "socket.io";

export function sendAnswerGuess(room: Room, userKey: number, answer: Answer, io:Server) {
    room.users[userKey].answerEvent.myAnswer = answer
    room.users[userKey].answerEvent.send = true
    room.game.guessEvent.answers.push(answer)
    io.to(room.id).emit('updateListUsers', room.users);
}
