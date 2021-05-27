import {
  FETCH_TUTORIAL_ERROR,
  FETCH_TUTORIAL_REQUEST,
  FETCH_TUTORIAL_SUCCESS,
  Tutorial,
  TutorialActionTypes
} from "./types";

export function FetchTutorialRequest(): TutorialActionTypes {
  return {
    type: FETCH_TUTORIAL_REQUEST
  }
}

export function FetchTutorialSuccess(tutorial: Tutorial): TutorialActionTypes {
  return {
    type: FETCH_TUTORIAL_SUCCESS,
    payload: tutorial
  }
}

export function FetchTutorialError(error: string): TutorialActionTypes {
  return {
    type: FETCH_TUTORIAL_ERROR,
    payload: error
  }
}
