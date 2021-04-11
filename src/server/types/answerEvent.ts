import {Answer} from "./answer";

export interface AnswerEvent {
    myAnswer: Answer,
    myAnswersUsers: Answer[]
    send: boolean
}

