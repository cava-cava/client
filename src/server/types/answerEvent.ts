import {User} from "../../store/user/types";

export interface AnswerEvent {
    myAnswer: string,
    myAnswersUsers: User[]
    send: boolean
}

