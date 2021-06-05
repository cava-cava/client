import {AnswerEvent} from "../../server/types/answerEvent";
import {StatisticsGame} from "../../server/types/statisticsGame";

export interface User {
  key: number
  id: string
  name: string
  color: string
  avatar: string
  ladder: number
  points: number
  joker: number
  dirt: number
  winEvent: boolean
  winOmg: boolean
  answerEvent: AnswerEvent,
  statisticsGame: StatisticsGame
  isReady: boolean
  progressBar: string
  gameOver: string[]
}

export interface userState {
  readonly loading: boolean;
  readonly data: User;
  readonly errors?: string;
}

export const SET_ID = '@@user/SET_ID'
export const SET_NAME = '@@user/SET_NAME'
export const SET_AVATAR = '@@user/SET_AVATAR'
export const SET_USER = '@@user/SET_USER'

interface SetId {
  type: typeof SET_ID
  payload: string
}

interface SetName {
  type: typeof SET_NAME
  payload: string
}

interface SetAvatar {
  type: typeof SET_AVATAR
  payload: string
}

interface SetUser {
  type: typeof SET_USER
  payload: User
}

export type UserActionTypes = SetId | SetName | SetUser | SetAvatar
