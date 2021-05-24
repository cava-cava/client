import React, {FunctionComponent} from 'react';
import click from "../../../assets/svg/appuyer.svg";
import swipe from "../../../assets/svg/swipe.svg";
import {Player} from "@lottiefiles/react-lottie-player";
import styles from './InteractionOmg.module.scss'
import SwipeInteractionOmg from "./SwipeInteractionOmg";

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
            {type === "click" &&
                <div onClick={onClick}>
                    <div>
                        {!active && <Player autoplay src={animationBefore}/>}
                        {active && <Player autoplay src={animationAfter}/>}
                    </div>
                    <div>
                        <img src={click}/>
                        <span>Appuyer</span>
                    </div>
                </div>
            }
            {type === "swipe" &&
                <SwipeInteractionOmg type={type} active={active} setActive={setActive} >
                    <div>
                        {!active && <Player autoplay src={animationBefore}/>}
                        {active && <Player autoplay src={animationAfter}/>}
                    </div>
                    <div>
                        <img src={swipe}/>
                        <span>Swiper</span>
                    </div>
                </SwipeInteractionOmg>
            }
        </div>
    )
}

export default InteractionOmg;
