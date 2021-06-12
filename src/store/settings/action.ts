import {
  SET_DEBUG_SETTINGS,
  SET_HOMEPAGE_SETTINGS,
  SET_MUSIC_SETTINGS,
  SET_VOLUME_SETTINGS,
  SettingsActionTypes
} from "./types";

export function SetMusicSettings(music: number): SettingsActionTypes {
  return {
    type: SET_MUSIC_SETTINGS,
    payload: music
  }
}

export function SetVolumeSettings(volume: number): SettingsActionTypes {
  return {
    type: SET_VOLUME_SETTINGS,
    payload: volume
  }
}

export function SetDebugSettings(debug: boolean): SettingsActionTypes {
  return {
    type: SET_DEBUG_SETTINGS,
    payload: debug
  }
}

export function SetHomepageSettings(homepage: boolean): SettingsActionTypes {
  return {
    type: SET_HOMEPAGE_SETTINGS,
    payload: homepage
  }
}

