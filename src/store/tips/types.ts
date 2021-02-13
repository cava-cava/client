export interface Tip {
  id?: number,
  message: string,
  published_at?: string | null
}

export interface tipsState {
  readonly loading: boolean;
  readonly data: Tip[];
  readonly errors?: string;
}

export const FETCH_TIPS_REQUEST = "@@tips/FETCH_TIPS_REQUEST";
export const FETCH_TIPS_SUCCESS = "@@tips/FETCH_TIPS_SUCCESS";
export const FETCH_TIPS_ERROR = "@@tips/FETCH_TIPS_ERROR";

interface FetchTipsRequest {
  type: typeof FETCH_TIPS_REQUEST
}

interface FetchTipsSuccess {
  type: typeof FETCH_TIPS_SUCCESS
  payload: Tip[]
}

interface FetchTipsError {
  type: typeof FETCH_TIPS_ERROR
  payload: string
}

export type TipsActionTypes = FetchTipsRequest | FetchTipsSuccess | FetchTipsError;
