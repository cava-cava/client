export interface Settings {
  volume: number
}

export interface settingsState {
  readonly loading: boolean;
  readonly data: Settings;
  readonly errors?: string;
}

export const SET_VOLUME_SETTINGS = "@@settings/SET_VOLUME_SETTINGS";

interface SetVolumeSettings {
  type: typeof SET_VOLUME_SETTINGS
  payload: number
}

export type SettingsActionTypes = SetVolumeSettings;
