import React, {FunctionComponent} from 'react';
import click from "../../../assets/svg/appuyer.svg";
import swipe from "../../../assets/svg/swipe.svg";
import {Controls, Player} from "@lottiefiles/react-lottie-player";
import styles from './InteractionOmg.module.scss'
import SwipeInteractionOmg from "./SwipeInteractionOmg";

type InteractionOmgProps = {
    controls?: boolean,
    type: string,
    animationBefore: string,
    animationAfter: string,
    active: boolean,
    setActive: (value: boolean) => void
}

const InteractionOmg: FunctionComponent<InteractionOmgProps> = ({
                                                                    controls = false,
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
                    {!active && <Player autoplay keepLastFrame src={animationBefore}>
                        <Controls visible={controls} buttons={['play', 'repeat', 'frame', 'debug']}/>
                    </Player>}
                    {active && <Player autoplay keepLastFrame src={animationAfter}>
                        <Controls visible={controls} buttons={['play', 'repeat', 'frame', 'debug']}/>
                    </Player>}
                </div>
                <div>
                    <img src={click}/>
                    <span>Appuyer</span>
                </div>
            </div>
            }
            {type === "swipe" &&
            <SwipeInteractionOmg type={type} active={active} setActive={setActive}>
                <div>
                    {!active && <Player autoplay keepLastFrame src={animationBefore}>
                        <Controls visible={controls} buttons={['play', 'repeat', 'frame', 'debug']}/>
                    </Player>}
                    {active && <Player autoplay keepLastFrame src={animationAfter}>
                        <Controls visible={controls} buttons={['play', 'repeat', 'frame', 'debug']}/>
                    </Player>}
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
