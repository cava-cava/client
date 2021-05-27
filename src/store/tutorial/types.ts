import {FileStrapi} from "../../server/types/fileStrapi";

export interface Tutorial {
  id?: number,
  videos: FileStrapi[]
}

export interface tutorialState {
  readonly loading: boolean;
  readonly data: Tutorial;
  readonly errors?: string;
}

export const FETCH_TUTORIAL_REQUEST = "@@tutorial/FETCH_TUTORIAL_REQUEST";
export const FETCH_TUTORIAL_SUCCESS = "@@tutorial/FETCH_TUTORIAL_SUCCESS";
export const FETCH_TUTORIAL_ERROR = "@@tutorial/FETCH_TUTORIAL_ERROR";

interface FetchTutorialRequest {
  type: typeof FETCH_TUTORIAL_REQUEST
}

interface FetchTutorialSuccess {
  type: typeof FETCH_TUTORIAL_SUCCESS
  payload: Tutorial
}

interface FetchTutorialError {
  type: typeof FETCH_TUTORIAL_ERROR
  payload: string
}

export type TutorialActionTypes = FetchTutorialRequest | FetchTutorialSuccess | FetchTutorialError;
