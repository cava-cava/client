import {SET_ID, SET_NAME, SET_USER, User, UserActionTypes} from "./types";

export function setId(id: string): UserActionTypes {
  return {
    type: SET_ID,
    payload: id
  }
}

export function setName(newName: string): UserActionTypes {
  return {
    type: SET_NAME,
    payload: newName
  }
}

export function setUser(user: User): UserActionTypes {
  return {
    type: SET_USER,
    payload: user
  }
}
