import React, {FunctionComponent} from 'react';
import TheModal from "./TheModal";
import SettingsModalCredits from "./Sub-Modal/SettingsModalCredits";
import InputRange from "../Form/InputRange";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {SET_MUSIC_SETTINGS, SET_VOLUME_SETTINGS} from "../../store/settings/types";
import styles from './SettingsModal.module.scss'
import volumeSound from "../../assets/mp3/tick.mp3"
import useSoundEffect from "../../hooks/useSoundEffect";

type SettingsModalProps = {
    isShowing: boolean
    hide: () => void
}

const SettingsModal: FunctionComponent<SettingsModalProps> = ({isShowing, hide}) => {
    const dispatch = useDispatch()
    const music: number = useSelector((state: ApplicationState) => state.settings.data.music);
    const volume: number = useSelector((state: ApplicationState) => state.settings.data.volume);
    const soundEffectVolume = useSoundEffect(volumeSound)

    const setMusic = (music: number) => {
        dispatch({type: SET_MUSIC_SETTINGS, payload: music})
    }

    const setVolume = (volume: number) => {
        soundEffectVolume?.play()
        dispatch({type: SET_VOLUME_SETTINGS, payload: volume})
    }

    return (
        <TheModal
            isShowing={isShowing}
            hide={hide}
            title="paramètres">
            <div>
                <div className={styles.SettingsModal}>
                    <h2>Musique</h2>
                    <InputRange id={"music"} name={"music"} value={music} setValue={setMusic} min={0} max={1}
                                step={0.1} convert={100}/>
                    <h2>Volume</h2>
                    <InputRange id={"volume"} name={"volume"} value={volume} setValue={setVolume} min={0} max={1}
                                step={0.1} convert={100}/>
                </div>
                <SettingsModalCredits/>
            </div>
        </TheModal>
    )
}

export default SettingsModal;
