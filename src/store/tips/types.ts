export interface Tip {
  id?: number,
  message: string,
  published_at?: string | null
}

export interface tipsState {
  readonly loading: boolean;
  readonly jwt?: string;
  readonly data: Tip[];
  readonly errors?: string;
}

export const FETCH_TIPS_REQUEST = "@@tips/FETCH_TIPS_REQUEST";
export const FETCH_TIPS_SUCCESS = "@@tips/FETCH_TIPS_SUCCESS";
export const ADD_TIPS_SUCCESS = "@@tips/ADD_TIPS_SUCCESS";
export const SET_JWT_TIPS = "@@tips/SET_JWT_TIPS";
export const FETCH_TIPS_ERROR = "@@tips/FETCH_TIPS_ERROR";

interface FetchTipsRequest {
  type: typeof FETCH_TIPS_REQUEST
}

interface FetchTipsSuccess {
  type: typeof FETCH_TIPS_SUCCESS
  payload: Tip[]
}

interface AddTipsSuccess {
  type: typeof ADD_TIPS_SUCCESS
  payload: Tip
}

interface SetJwtTips {
  type: typeof SET_JWT_TIPS
  payload: string
}

interface FetchTipsError {
  type: typeof FETCH_TIPS_ERROR
  payload: string
}

export type TipsActionTypes = FetchTipsRequest | FetchTipsSuccess | AddTipsSuccess | FetchTipsError | SetJwtTips;
