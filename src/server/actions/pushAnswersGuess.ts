import {Answer} from "../types/answer";
import {Room} from "../types/rooms";
import {User} from "../../store/user/types";
import {Server} from "socket.io";

export function pushAnswersGuess(room:Room, user:User, answer:Answer, io:Server) {
    if(user.answerEvent.allAnswersUserKey.filter(answerUserKey => answerUserKey === answer.myAnswerKey).length > 0)  {
        user.answerEvent.myAnswersUsers.push(answer)
        user.answerEvent.allAnswersUserKey = user.answerEvent.allAnswersUserKey.filter(answerUserKey => answerUserKey !== answer.myAnswerKey)
    }
    if(user.answerEvent.allAnswersUserKey.length === 0) {
        user.answerEvent.send = true
        io.to(user.id).emit('send', user.answerEvent.send)
    }
}
