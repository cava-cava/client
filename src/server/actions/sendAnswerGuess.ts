import {Room} from "../types/rooms";
import {Answer} from "../types/answer";

export function sendAnswerGuess(room: Room, userKey: number, answer: Answer) {
    room.users[userKey].answerEvent.myAnswer = answer
    room.users[userKey].answerEvent.send = true
    room.game.guessEvent.answers.push(answer)
}
