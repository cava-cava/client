import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import styles from './VideoBackgroundGame.module.scss'
import {Card} from "../../../server/types/card";
import ReactPlayer from "react-player";

type VideoBackgroundGameProps = {
    play: boolean
    card?: Card
}

const VideoBackgroundGame: FunctionComponent<VideoBackgroundGameProps> = ({play, card}) => {
    const [playingVideo, setPlayingVideo] = useState<boolean>(false)
    const [playingVideoReverse, setPlayingVideoReverse] = useState<boolean>(false)
    const [canReverse, setCanReverse] = useState(false)
    const [lastCard, setLastCard] = useState<Card>()
    const [triggerVideo, setTriggerVideo] = useState<boolean>(false)

    useEffect(() => {
        if (!card || !play) {
            if (canReverse) setPlayingVideoReverse(true)
            return
        } else if (card !== lastCard) {
            setTriggerVideo(true)
            if (canReverse) setPlayingVideoReverse(true)
            else setPlayingVideo(true)
        }
    }, [play, card])

    const onPlayVideo = () => {
        if (card !== lastCard) setLastCard(card)
    }

    const onEndedVideo = () => {
        if (playingVideo) setPlayingVideo(false)
        if (!canReverse && triggerVideo) {
            setCanReverse(true)
            setTriggerVideo(false)
        }
    }

    const onEndedVideoReverse = () => {
        if(playingVideoReverse) setPlayingVideoReverse(false)
        if (canReverse) setCanReverse(false)
        if (card && play) setPlayingVideo(true)
        else if (lastCard) setLastCard(undefined)
    }

    return (
        <div className={styles.VideoBackgroundGame}>
            {card &&
            <ReactPlayer url={card.Points > 0 ? "/mp4/yellow.mp4" : "/mp4/black.mp4"} playing={playingVideo} loop={false}
                         muted={true} controls={false}
                         playsInline={true} width={'100%'} height='auto' onEnded={onEndedVideo} onPlay={onPlayVideo}/>
            }
            {(canReverse) &&
            <ReactPlayer url={lastCard && lastCard.Points > 0 ? "/mp4/reverseYellow.mp4" : "/mp4/reverseBlack.mp4"}
                         playing={playingVideoReverse} loop={false}
                         muted={true} controls={false}
                         playsInline={true} width={'100%'} height='auto' onEnded={onEndedVideoReverse}/>
            }
        </div>
    )
}

export default VideoBackgroundGame;
