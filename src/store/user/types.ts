export interface User {
  key: number
  id: string
  name: string
  color?: string
  points: number
  joker: number
  dirt: number
}

export interface userState {
  readonly loading: boolean;
  readonly data: User;
  readonly errors?: string;
}

export const SET_ID = '@@user/SET_ID'
export const SET_NAME = '@@user/SET_NAME'

interface SetId {
  type: typeof SET_ID
  payload: string
}

interface SetName {
  type: typeof SET_NAME
  payload: string
}

export type UserActionTypes = SetId | SetName
