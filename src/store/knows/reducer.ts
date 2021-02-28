import {Reducer} from "redux";

import {FETCH_KNOWS_ERROR, FETCH_KNOWS_REQUEST, FETCH_KNOWS_SUCCESS, KnowsActionTypes, knowsState} from "./types";

export const initialState: knowsState = {
  data: [],
  errors: undefined,
  loading: false
};

const reducer: Reducer<knowsState, KnowsActionTypes> = (state:knowsState = initialState, action: KnowsActionTypes) => {
  switch (action.type) {
    case FETCH_KNOWS_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_KNOWS_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case FETCH_KNOWS_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as knowsReducer };
