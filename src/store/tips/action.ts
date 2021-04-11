import {FETCH_TIPS_ERROR, FETCH_TIPS_REQUEST, FETCH_TIPS_SUCCESS, SET_JWT_TIPS, Tip, TipsActionTypes} from "./types";

export function FetchTipsRequest(): TipsActionTypes {
  return {
    type: FETCH_TIPS_REQUEST
  }
}

export function SetJwtTips(jwt: string): TipsActionTypes {
  return {
    type: SET_JWT_TIPS,
    payload: jwt
  }
}

export function FetchTipsSuccess(Tips: Tip[]): TipsActionTypes {
  return {
    type: FETCH_TIPS_SUCCESS,
    payload: Tips
  }
}

export function FetchTipsError(error: string): TipsActionTypes {
  return {
    type: FETCH_TIPS_ERROR,
    payload: error
  }
}
