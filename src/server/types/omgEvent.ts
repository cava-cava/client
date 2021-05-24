import {Omg} from "./omg";

export interface OmgEvent {
    id: number
    trigger: boolean
    idTrigger: number
    omg?: Omg
    idStep: number
}

