import interfaceSrc from "../assets/mp3/musique/interface.mp3"
import gameSrc from "../assets/mp3/musique/game.mp3"
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {useEffect} from "react";
import useAudio from "./useAudio";

const useMusics = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);
    const volume: number = useSelector((state: ApplicationState) => state.settings.data.music);
    const {audio:musicInterface} = useAudio(interfaceSrc, true, true)
    const {audio:musicGame} = useAudio(gameSrc, false, true)

    useEffect(()=> {
        musicInterface?.volume(volume)
        musicGame?.volume(volume)
    }, [volume])

    useEffect(()=> {
        if(!musicGame || !musicInterface) return
        if(user.playingGame) {
            if(musicInterface.playing()) {
                musicInterface.once( 'fade', () => { musicInterface.stop() })
                musicInterface.fade(volume, 0, 1000)
            }
            if(!musicGame.playing()) {
                musicGame.play()
                musicGame.fade(0, volume, 1000)
            }
        } else {
            if(musicGame.playing()) {
                musicGame.once( 'fade', () => { musicGame.stop() })
                musicGame.fade(volume, 0, 1000)
            }
            if(!musicInterface.playing()) {
                musicInterface.play()
                musicInterface.fade(0, volume, 1000)
            }
        }
    }, [user.playingGame, musicInterface, musicGame])
};

export default useMusics;
