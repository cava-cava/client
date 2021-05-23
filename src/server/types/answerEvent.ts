import {Answer} from "./answer";

export interface AnswerEvent {
    myAnswer: Answer,
    myAnswersUsers: Answer[]
    allAnswersUserKey: number[]
    send: boolean
    winEvent: boolean
}

