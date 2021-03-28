import {SET_ID, SET_NAME, UserActionTypes} from "./types";

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
