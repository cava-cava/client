import {Reducer} from "redux";

import {FETCH_TUTORIAL_ERROR, FETCH_TUTORIAL_REQUEST, FETCH_TUTORIAL_SUCCESS, TutorialActionTypes, tutorialState} from "./types";

export const initialState: tutorialState = {
  data: {
    videos: []
  },
  errors: undefined,
  loading: false
};

const reducer: Reducer<tutorialState, TutorialActionTypes> = (state:tutorialState = initialState, action: TutorialActionTypes) => {
  switch (action.type) {
    case FETCH_TUTORIAL_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_TUTORIAL_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case FETCH_TUTORIAL_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as tutorialReducer };
