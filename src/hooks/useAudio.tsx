import {Howl} from "howler";
import {useEffect, useState} from "react";

const useAudio = (src:string, autoplay:boolean, loop:boolean) => {
    const [audio, setAudio] = useState<Howl>()

    useEffect(() => {
        setAudio(new Howl({
            src: [src],
            autoplay: autoplay,
            loop: loop
        }))
        return () => {
            audio?.fade(audio.volume(), 0, 1000)
            audio?.stop()
        }
    }, [])

    return audio;
};

export default useAudio;
