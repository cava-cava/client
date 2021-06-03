import {Reducer} from "redux";
import {
  SET_DEBUG_SETTINGS,
  SET_HOMEPAGE_SETTINGS,
  SET_MUSIC_SETTINGS,
  SET_VOLUME_SETTINGS,
  SettingsActionTypes,
  settingsState
} from "./types";

export const initialState: settingsState = {
  data: {
    music: 0.5,
    volume: 0.75,
    debug: false,
    homepage: false
  },
  errors: undefined,
  loading: false
};

const reducer: Reducer<settingsState, SettingsActionTypes> = (state:settingsState = initialState, action: SettingsActionTypes) => {
  switch (action.type) {
    case SET_MUSIC_SETTINGS: {
      return { ...state, loading: false, data: {...state.data, music: action.payload} };
    }
    case SET_VOLUME_SETTINGS: {
      return { ...state, loading: false, data: {...state.data, volume: action.payload} };
    }
    case SET_DEBUG_SETTINGS: {
      return { ...state, loading: false, data: {...state.data, debug: action.payload} };
    }
    case SET_HOMEPAGE_SETTINGS: {
      return { ...state, loading: false, data: {...state.data, homepage: action.payload} };
    }
    default: {
      return state;
    }
  }
};

export { reducer as settingsReducer };
