import React, {FunctionComponent} from 'react';
import click from "../../../assets/svg/appuyer.svg";
import swipe from "../../../assets/svg/swipe.svg";
import {Player} from "@lottiefiles/react-lottie-player";
import styles from './InteractionOmg.module.scss'

type InteractionOmgProps = {
    type: string,
    animationBefore: string,
    animationAfter: string,
    active: boolean,
    setActive: (value: boolean) => void
}

const InteractionOmg: FunctionComponent<InteractionOmgProps> = ({
                                                                    type = "click",
                                                                    animationBefore,
                                                                    animationAfter,
                                                                    active,
                                                                    setActive
                                                                }) => {
    const onClick = () => {
        if (type !== "click" || active) return;
        setActive(true)
    }

    return (
        <div className={styles.InteractionOmg}>
            <div onClick={onClick} >
                <Player controls={true} autoplay src={active ? animationAfter : animationBefore}/>
            </div>
            {type === "click" &&
            <div>
                <img src={click}/>
                <span>Appuyer</span>
            </div>
            }
            {type === "swipe" &&
            <div>
                <img src={swipe}/>
                <span>Swiper</span>
            </div>
            }
        </div>
    )
}

export default InteractionOmg;

/*
const SwipeItem: FunctionComponent = ({...props}) => {
    const handleStart = (clientX:number) => {

    }

    const handleMove = (clientX:number) => {

    }

    const handleEnd = () => {

    }

    const handleTouchStart = (touchStartEvent:any) => {
        touchStartEvent.preventDefault();
    }

    const handleTouchMove = (touchMoveEvent:any) => {
        handleMove(touchMoveEvent.targetTouches[0].clientX);
    }

    const handleTouchEnd = () => {
        handleEnd();
    }

    const handleMouseDown = (mouseDownEvent:any) => {
        mouseDownEvent.preventDefault();
        handleStart(mouseDownEvent.clientX);
    }

    const handleMouseMove = (mouseMoveEvent:any) => {
        handleMove(mouseMoveEvent.clientX);
    }

    const handleMouseUp = () => {
        handleEnd();
    }

    const handleMouseLeave = () => {
        handleMouseUp();
    }

        return (
            <div
                onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
                onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
                onTouchEnd={() => handleTouchEnd()}
                // The following event handlers are for mouse compatibility:
                onMouseDown={mouseDownEvent => handleMouseDown(mouseDownEvent)}
                onMouseMove={mouseMoveEvent => handleMouseMove(mouseMoveEvent)}
                onMouseUp={() => handleMouseUp()}
                onMouseLeave={() => handleMouseLeave()}
            >
                    {props.children}
            </div>
        );
}
*/
