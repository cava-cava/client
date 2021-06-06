import React, {FunctionComponent, useEffect, useState} from "react";
import {Html} from "@react-three/drei";
import {Card} from "../../server/types/card";
import styles from "./CardContent.module.scss";
import {Player} from "@lottiefiles/react-lottie-player";
import {useSpring} from "react-spring/three";
import {a} from "react-spring";

type CardContentProps = {
    isAlternative: boolean,
    show: boolean,
    position: any
    rotation: number
    card?: Card
    debug?: boolean
};

const CardContent: FunctionComponent<CardContentProps> = ({
                                                              isAlternative,
                                                              show,
                                                              position,
                                                              rotation,
                                                              card,
                                                              debug = false
                                                          }) => {
    const [active, setActive] = useState(true)

    const fade: any = useSpring({
        from: {opacity: 0},
        to: {opacity: show && card ? 1 : 0},
        delay: show ? 500 : 0,
        config: { duration: 200 },
        onStart: () => {
            if(show) setActive(true)
        },
        onRest: () => {
            if(!show) setActive(false)
        }
    });

    useEffect(() => {
        setActive(show)
    }, [])

    return active && card ? (
        <Html
            className={styles.CardContent}
            position={position}
            style={debug ? {
                border: '1px solid red',
                transform: `rotate(${rotation}rad) translate(-50%, -50%)`
            } : {transform: `rotate(${rotation}rad) translate(-50%, -50%)`}}
        >
            <a.div style={fade}>
                {(!card.animation || card.animation.url.length === 0) ?
                    <>
                        <p className={`${(card.Points < 0 && isAlternative) ? styles.CardContentNegative : undefined} ${styles.CardContentAbsoluteText}`}>{card.Description}</p>
                        <Player autoplay keepLastFrame src={card.Points > 0 ? '/Sohcava.json' : '/Scheh.json'}/>
                    </>
                    :
                    <>
                        <Player autoplay keepLastFrame className={styles.CardContentAnimation} src={card.animation.url}/>
                        <p className={(card.Points < 0 && isAlternative) ? styles.CardContentNegative : undefined}>{card.Description}</p>
                    </>}
            </a.div>
        </Html>
    ) : null;
};

export default CardContent;
