import {SET_NAME, UserActionTypes} from "./types";

export function setName(newName: string): UserActionTypes {
  return {
    type: SET_NAME,
    payload: newName
  }
}
