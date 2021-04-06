export interface User {
  key: number
  id: string
  name: string
  color: string
  ladder: number
  points: number
  joker: number
  dirt: number
  answerGuess: string
  answersGuess: User[]
  winBooty: boolean
}

export interface userState {
  readonly loading: boolean;
  readonly data: User;
  readonly errors?: string;
}

export const SET_ID = '@@user/SET_ID'
export const SET_NAME = '@@user/SET_NAME'
export const SET_USER = '@@user/SET_USER'

interface SetId {
  type: typeof SET_ID
  payload: string
}

interface SetName {
  type: typeof SET_NAME
  payload: string
}

interface SetUser {
  type: typeof SET_USER
  payload: User
}

export type UserActionTypes = SetId | SetName | SetUser
