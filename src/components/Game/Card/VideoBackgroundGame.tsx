import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import yellow from '../../../assets/mp4/fond_jaune.mp4'
import black from '../../../assets/mp4/fond_noir.mp4'
import reverseYellow from '../../../assets/mp4/reverse_jaune.mp4'
import reverseBlack from '../../../assets/mp4/reverse_noir.mp4'
import styles from './VideoBackgroundGame.module.scss'
import {Card} from "../../../server/types/card";

type VideoBackgroundGameProps = {
    play: boolean
    card?: Card
}

const VideoBackgroundGame: FunctionComponent<VideoBackgroundGameProps> = ({play, card}) => {
    const refVideo = useRef<any>()
    const refVideoReverse = useRef<any>()
    const [reverse, setReverse] = useState(false)
    const [lastCard, setLastCard] = useState<Card>()
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        if (!card || !play) {
            if(reverse) videoReversePlay()
            return
        }
        else if (card !== lastCard) {
            setTrigger(true)
            if (reverse) videoReversePlay()
            else videoPlay()
        }
    }, [play, card])

    const videoPlay = () => {
        if(null === refVideo.current) return
        refVideo.current.pause()
        refVideo.current.currentTime = 0;
        refVideo.current.play()
        if (card !== lastCard) setLastCard(card)
    }

    const videoReversePlay = () => {
        if(null === refVideoReverse.current) return
        refVideoReverse.current.pause()
        refVideoReverse.current.currentTime = 0;
        refVideoReverse.current.play()
        if(null === refVideo.current) return
        refVideo.current.pause()
        refVideo.current.currentTime = 0;
    }

    const onEndedVideo = () => {
        if (trigger && !reverse) {
            setReverse(true)
            setTrigger(false)
        }
    }

    const onEndedVideoReverse = () => {
        if (reverse) setReverse(false)
        if(card && play) videoPlay()
        else if(lastCard) setLastCard(undefined)
    }

    return (
        <div className={styles.VideoBackgroundGame}>
            {card && <video ref={refVideo}
                   src={card.Points > 0 ? yellow : black} loop={false}
                   playsInline
                   muted={true} controls={false} onEnded={onEndedVideo}/>}
            {(reverse) && <video ref={refVideoReverse}
                                             src={lastCard && lastCard.Points > 0 ? reverseYellow : reverseBlack}
                                             loop={false}
                                             playsInline
                                             muted={true} controls={false}
                                             onEnded={onEndedVideoReverse}/>}
        </div>
    )
}

export default VideoBackgroundGame;
