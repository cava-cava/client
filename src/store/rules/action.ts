import {
  FETCH_RULES_ERROR,
  FETCH_RULES_REQUEST,
  FETCH_RULES_SUCCESS,
  Rules,
  RulesActionTypes
} from "./types";

export function FetchRulesRequest(): RulesActionTypes {
  return {
    type: FETCH_RULES_REQUEST
  }
}

export function FetchRulesSuccess(Rules: Rules): RulesActionTypes {
  return {
    type: FETCH_RULES_SUCCESS,
    payload: Rules
  }
}

export function FetchRulesError(error: string): RulesActionTypes {
  return {
    type: FETCH_RULES_ERROR,
    payload: error
  }
}
