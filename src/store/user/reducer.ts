import {Reducer} from "redux";

import {SET_ID, SET_NAME, UserActionTypes, userState} from "./types";

export const initialState: userState = {
  data: {
    key: 0,
    id: '',
    name: '',
    color: undefined,
    joker: 2,
    dirt: 2
  },
  errors: undefined,
  loading: false
};

const reducer: Reducer<userState, UserActionTypes> = (state:userState = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_ID: {
      return { ...state, data: {...state.data, id: action.payload,} };
    }
    case SET_NAME: {
      return { ...state, data: {...state.data, name: action.payload,} };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
