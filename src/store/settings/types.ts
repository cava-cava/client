export interface Settings {
  volume: number,
  debug: boolean,
}

export interface settingsState {
  readonly loading: boolean;
  readonly data: Settings;
  readonly errors?: string;
}

export const SET_VOLUME_SETTINGS = "@@settings/SET_VOLUME_SETTINGS";
export const SET_DEBUG_SETTINGS = "@@settings/SET_DEBUG_SETTINGS";

interface SetVolumeSettings {
  type: typeof SET_VOLUME_SETTINGS
  payload: number
}

interface SetDebugSettings {
  type: typeof SET_DEBUG_SETTINGS
  payload: boolean
}

export type SettingsActionTypes = SetVolumeSettings | SetDebugSettings;
