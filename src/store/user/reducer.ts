import {Reducer} from "redux";

import {SET_ID, SET_NAME, SET_USER, UserActionTypes, userState} from "./types";

export const initialState: userState = {
  data: {
    key: -1,
    id: '',
    name: '',
    color: 'black',
    ladder: 1,
    points: 0,
    joker: 2,
    dirt: 2,
    winEvent: false,
    answerEvent: {
      myAnswer: '',
      myAnswersUsers: [],
      send: false
    },
    statisticsGame: {
      bonus: 0,
      malus: 0,
      useJoker: 0,
      useJokerForMe: 0,
      useJokerForOther: 0,
      useDirt: 0,
      guessWon: 0,
      omgWon: 0
    },
    gameOver: []
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
    case SET_USER: {
      return { ...state, data: {...state.data, ...action.payload} };
    }
    default: {
      return state;
    }
  }
};

export { reducer as userReducer };
