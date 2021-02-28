import {FETCH_KNOWS_ERROR, FETCH_KNOWS_REQUEST, FETCH_KNOWS_SUCCESS, Know, KnowsActionTypes} from "./types";

export function FetchKnowsRequest(): KnowsActionTypes {
  return {
    type: FETCH_KNOWS_REQUEST
  }
}

export function FetchKnowsSuccess(Knows: Know[]): KnowsActionTypes {
  return {
    type: FETCH_KNOWS_SUCCESS,
    payload: Knows
  }
}

export function FetchKnowsError(error: string): KnowsActionTypes {
  return {
    type: FETCH_KNOWS_ERROR,
    payload: error
  }
}
