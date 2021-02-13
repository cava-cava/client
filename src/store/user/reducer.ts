import {Reducer} from "redux";

import {SET_NAME, UserActionTypes, userState} from "./types";

export const initialState: userState = {
  data: {
    name: '',
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjEzMDcwODI4LCJleHAiOjE2MTU2NjI4Mjh9.podMQsLLLWnnRRPdbViwUyaF2jZlh5SkTYxiVIljxH4'
  },
  errors: undefined,
  loading: false
};

const reducer: Reducer<userState, UserActionTypes> = (state:userState = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case SET_NAME: {
      return { ...state, data: {name: action.payload, jwt: state.data.jwt} };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
