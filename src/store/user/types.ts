export interface User {
  name: string;
  jwt: string
}

export interface userState {
  readonly loading: boolean;
  readonly data: User;
  readonly errors?: string;
}

export const SET_NAME = '@@user/SET_NAME'

interface SetName {
  type: typeof SET_NAME
  payload: string
}

export type UserActionTypes = SetName
