import React, {FunctionComponent} from 'react';
import TheModal from "./TheModal";
import title from "../../assets/title/parametres.png"
import SettingsModalCredits from "./Sub-Modal/SettingsModalCredits";
import InputRange from "../Form/InputRange";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {SET_VOLUME_SETTINGS} from "../../store/settings/types";
import styles from './SettingsModal.module.scss'
// @ts-ignore
import volumeSound from "../../assets/mp3/tick.mp3"

type SettingsModalProps = {
    isShowing: boolean
    hide: () => void
}

const SettingsModal: FunctionComponent<SettingsModalProps> = ({isShowing, hide}) => {
    const dispatch = useDispatch()
    const volume: number = useSelector((state: ApplicationState) => state.settings.data.volume);
    const audioVolume = new Audio(volumeSound)

    const setVolume = (volume: number) => {
        audioVolume.volume = volume
        if (audioVolume.paused) {
            audioVolume.play()
        }
        dispatch({type: SET_VOLUME_SETTINGS, payload: volume})
    }

    return (
        <TheModal
            isShowing={isShowing}
            hide={hide}
            title={title}>
            <div>
                <div className={styles.SettingsModal}>
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
