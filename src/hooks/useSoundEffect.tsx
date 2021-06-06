import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import useAudio from "./useAudio";
import {useEffect} from "react";

const useSoundEffect = (src:string) => {
    const volume: number = useSelector((state: ApplicationState) => state.settings.data.volume);
    const sound = useAudio(src, false, false);

    useEffect(()=> {
        sound?.volume(volume)
    }, [volume])

    return sound
};

export default useSoundEffect;
