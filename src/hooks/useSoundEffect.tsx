import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import useAudio from "./useAudio";
import {useEffect} from "react";

const useSoundEffect = (src: string, autoplay:boolean) => {
    const volume:number = useSelector((state: ApplicationState) => state.settings.data.volume);
    const {audio: sound, setSource} = useAudio(src, autoplay, false);

    useEffect(() => {
        sound?.volume(volume)
    }, [volume])

    return {sound, setSource}
};

export default useSoundEffect;
