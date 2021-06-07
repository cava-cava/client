import {Howl} from "howler";
import {useEffect, useState} from "react";

const useAudio = (src: string, autoplay: boolean, loop: boolean) => {
    const [audio, setAudio] = useState<Howl>()
    const [source, setSource] = useState<string>(src)

    useEffect(() => {
        setAudio(new Howl({
            src: [source],
            autoplay: autoplay,
            loop: loop
        }))
        return () => {
            audio?.once( 'fade', () => { audio?.stop() })
            audio?.fade(audio?.volume(), 0, 1000)
        }
    }, [source])

    return {audio, setSource};
};

export default useAudio;
