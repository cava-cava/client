import {Reducer} from "redux";
import {SET_DEBUG_SETTINGS, SET_VOLUME_SETTINGS, SettingsActionTypes, settingsState} from "./types";

export const initialState: settingsState = {
  data: {
    volume: 0.75,
    debug: false
  },
  errors: undefined,
  loading: false
};

const reducer: Reducer<settingsState, SettingsActionTypes> = (state:settingsState = initialState, action: SettingsActionTypes) => {
  switch (action.type) {
    case SET_VOLUME_SETTINGS: {
      return { ...state, loading: false, data: {...state.data, volume: action.payload} };
    }
    case SET_DEBUG_SETTINGS: {
      return { ...state, loading: false, data: {...state.data, debug: action.payload} };
    }
    default: {
      return state;
    }
  }
};

export { reducer as settingsReducer };
