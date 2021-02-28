export interface Know {
  id?: number,
  text: string
}

export interface knowsState {
  readonly loading: boolean;
  readonly data: Know[];
  readonly errors?: string;
}

export const FETCH_KNOWS_REQUEST = "@@knows/FETCH_KNOWS_REQUEST";
export const FETCH_KNOWS_SUCCESS = "@@knows/FETCH_KNOWS_SUCCESS";
export const FETCH_KNOWS_ERROR = "@@knows/FETCH_KNOWS_ERROR";

interface FetchKnowsRequest {
  type: typeof FETCH_KNOWS_REQUEST
}

interface FetchKnowsSuccess {
  type: typeof FETCH_KNOWS_SUCCESS
  payload: Know[]
}

interface FetchKnowsError {
  type: typeof FETCH_KNOWS_ERROR
  payload: string
}

export type KnowsActionTypes = FetchKnowsRequest | FetchKnowsSuccess | FetchKnowsError;
