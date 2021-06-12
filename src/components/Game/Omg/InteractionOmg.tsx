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
    const [start, setStart] = useState<boolean>(false)

    const handleStart = (startEvent: any) => {
        if (type !== "swipe" || active || !canDoInteraction || !start) return;
        const clientY =  startEvent?.touches?.length > 0 ? startEvent.touches[0].clientY : startEvent.clientY;
        setClientYStart(clientY)
    }

    const handleEnd = (endEvent: any) => {
        if (type !== "swipe" || active || !canDoInteraction || !start) return;
        const clientYEnd =  endEvent?.changedTouches?.length > 0 ? endEvent.changedTouches[0].clientY : endEvent.clientY;
        if ((clientYStart - clientYEnd) > 100) {
            setActive(true)
            if (roomId !== undefined && userKey !== undefined) socket.emit('winOmg', roomId, userKey)
        }
    }

    const onClick = () => {
        if (type !== "click" || active || !canDoInteraction || !start) return;
        setActive(true)
        if (roomId !== undefined && userKey !== undefined) socket.emit('winOmg', roomId, userKey)
    }


    return (
        <div className={styles.InteractionOmg} onClick={onClick}
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
                        <Player autoplay keepLastFrame src={active ? animationAfter : animationBefore}
                                onEvent={event => {
                                    if (event === 'complete' && !start) setStart(true)
                                }}>
                            <Controls visible={controls} buttons={['play', 'repeat', 'frame', 'debug']}/>
                        </Player>
                    </CSSTransition>
                </div>
                <CSSTransition
                    in={(canDoInteraction && start && !active)}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <div>
                        <img src={type === "swipe" ? swipe : click}/>
                        <span>{type === "swipe" ? "Swiper" : "Appuyer"}</span>
                    </div>
                </CSSTransition>
            </>
        </div>
    )
}

export default InteractionOmg;
