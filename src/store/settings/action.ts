import {SET_VOLUME_SETTINGS, SettingsActionTypes} from "./types";

export function SetVolumeSettings(volume: number): SettingsActionTypes {
  return {
    type: SET_VOLUME_SETTINGS,
    payload: volume
  }
}
