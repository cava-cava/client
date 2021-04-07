import {Reducer} from "redux";

import {FETCH_MESSAGES_ERROR, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, MessagesActionTypes, messagesState} from "./types";

export const initialState: messagesState = {
  data: [],
  errors: undefined,
  loading: false
};

const reducer: Reducer<messagesState, MessagesActionTypes> = (state:messagesState = initialState, action: MessagesActionTypes) => {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_MESSAGES_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case FETCH_MESSAGES_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as messagesReducer };
