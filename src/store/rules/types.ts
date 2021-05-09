import {FileStrapi} from "../../server/types/fileStrapi";

export interface Rules {
  But?: string,
  Deroulement?: string,
  Cards?: RulesCards[]
}

export interface RulesCards {
  title: string
  description: string
  image: FileStrapi
}

export interface rulesState {
  readonly loading: boolean;
  readonly data: Rules;
  readonly errors?: string;
}

export const FETCH_RULES_REQUEST = "@@rules/FETCH_RULES_REQUEST";
export const FETCH_RULES_SUCCESS = "@@rules/FETCH_RULES_SUCCESS";
export const FETCH_RULES_ERROR = "@@rules/FETCH_RULES_ERROR";

interface FetchRulesRequest {
  type: typeof FETCH_RULES_REQUEST
}

interface FetchRulesSuccess {
  type: typeof FETCH_RULES_SUCCESS
  payload: Rules
}

interface FetchRulesError {
  type: typeof FETCH_RULES_ERROR
  payload: string
}

export type RulesActionTypes = FetchRulesRequest | FetchRulesSuccess | FetchRulesError;
