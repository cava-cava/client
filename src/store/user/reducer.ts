import {Reducer} from "redux";

import {SET_NAME, UserActionTypes, userState} from "./types";

export const initialState: userState = {
  data: {
    name: ''
  },
  errors: undefined,
  loading: false
};

const reducer: Reducer<userState, UserActionTypes> = (state:userState = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_NAME: {
      return { ...state, data: {name: action.payload} };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
