import {Reducer} from "redux";

import {
  FETCH_TIPS_ERROR,
  FETCH_TIPS_REQUEST,
  FETCH_TIPS_SUCCESS,
  SET_JWT_TIPS,
  TipsActionTypes,
  tipsState
} from "./types";

export const initialState: tipsState = {
  data: [],
  jwt: undefined,
  errors: undefined,
  loading: false
};

const reducer: Reducer<tipsState, TipsActionTypes> = (state:tipsState = initialState, action: TipsActionTypes) => {
  switch (action.type) {
    case FETCH_TIPS_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_TIPS_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case SET_JWT_TIPS: {
      return { ...state, loading: false, jwt: action.payload };
    }
    case FETCH_TIPS_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as tipsReducer };
