import {Reducer} from "redux";

import {
  FETCH_RULES_ERROR,
  FETCH_RULES_REQUEST,
  FETCH_RULES_SUCCESS,
  RulesActionTypes, rulesState
} from "./types";

export const initialState: rulesState = {
  data: {},
  errors: undefined,
  loading: false
};

const reducer: Reducer<rulesState, RulesActionTypes> = (state:rulesState = initialState, action: RulesActionTypes) => {
  switch (action.type) {
    case FETCH_RULES_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_RULES_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case FETCH_RULES_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as rulesReducer };
