import React, {FunctionComponent, useState} from 'react';
import click from "../../../assets/svg/appuyer.svg";
import swipe from "../../../assets/svg/swipe.svg";
import {Controls, Player} from "@lottiefiles/react-lottie-player";
import styles from './InteractionOmg.module.scss'
import {socket} from "../../../socketClient";
import {CSSTransition} from "react-transition-group";

type InteractionOmgProps = {
    controls?: boolean,
    roomId?: string,
    userKey?: number,
    type: string,
    animationBefore: string,
    animationAfter: string,
    active: boolean,
    canDoInteraction: boolean
    setActive: (value: boolean) => void
}

const InteractionOmg: FunctionComponent<InteractionOmgProps> = ({
                                                                    controls = false,
                                                                    roomId, userKey,
                                                                    type = "click",
                                                                    animationBefore,
                                                                    animationAfter,
                                                                    active,
                                                                    canDoInteraction,
                                                                    setActive
                                                                }) => {
    const [clientYStart, setClientYStart] = useState<number>(0)

    const handleStart = (startEvent:any) => {
        startEvent.preventDefault();
        if (type !== "swipe" || active || !canDoInteraction) return;
        setClientYStart(startEvent.clientY)
    }

    const handleEnd = (endEvent:any) => {
        endEvent.preventDefault();
        if (type !== "swipe" || active || !canDoInteraction) return;
        if((clientYStart - endEvent.clientY) > 100) {
            setActive(true)
            if(roomId !== undefined && userKey !== undefined) socket.emit('winOmg', roomId, userKey)
        }
    }

    const onClick = () => {
        if (type !== "click" || active || !canDoInteraction) return;
        setActive(true)
        if(roomId !== undefined && userKey !== undefined) socket.emit('winOmg', roomId, userKey)
    }

    return (
        <div className={styles.InteractionOmg}  onClick={onClick}
                                                onTouchStart={(touchStartEvent) => handleStart(touchStartEvent)}
                                                onTouchEnd={(touchEndEvent) => handleEnd(touchEndEvent)}
                                                // The following event handlers are for mouse compatibility:
                                                onMouseDown={mouseDownEvent => handleStart(mouseDownEvent)}
                                                onMouseUp={(mouseUpEvent) => handleEnd(mouseUpEvent)}
                                                onMouseLeave={(mouseLeaveEvent) => handleEnd(mouseLeaveEvent)}>
            <>
                <div>
                    <CSSTransition
                        in={active}
                        timeout={300}
                        classNames="fade"
                    >
                        <Player autoplay keepLastFrame src={active ? animationAfter : animationBefore}>
                            <Controls visible={controls} buttons={['play', 'repeat', 'frame', 'debug']}/>
                        </Player>
                    </CSSTransition>
                </div>
                {
                    (!active && canDoInteraction) &&
                    <div>
                        <img src={type === "swipe" ? swipe : click}/>
                        <span>{type === "swipe" ? "Swiper" : "Appuyer"}</span>
                    </div>
                }
            </>
        </div>
    )
}

export default InteractionOmg;
