import React, {FunctionComponent, useEffect, useState} from "react";
import {Html} from "@react-three/drei";
import {Card} from "../../server/types/card";
import styles from "./CardContent.module.scss";
import {Player} from "@lottiefiles/react-lottie-player";
import {useSpring} from "react-spring/three";
import {a} from "react-spring";

type CardContentProps = {
    show: boolean,
    position: any
    rotation: number
    card: Card
    debug?: boolean
};

const CardContent: FunctionComponent<CardContentProps> = ({
                                                              show,
                                                              position,
                                                              rotation,
                                                              card,
                                                              debug = false
                                                          }) => {
    const [active, setActive] = useState(true)

    const fade:any = useSpring({
        from: { opacity: show ? 0 : 1 },
        to: { opacity: show ? 1 : 0},
        onRest: () => {
            setActive(show)
        }
    });

    useEffect(() => {
        setActive(show)
    }, [])

    return active ? (
        <Html
            className={styles.CardContent}
            position={position}
            style={debug ? {
                border: '1px solid red',
                transform: `rotate(${rotation}rad)`
            } : {transform: `rotate(${rotation}rad)`}}
        >
            <a.div style={fade}>
                {card.animation && (card.animation.url && card.animation.url.length !== 0) &&
                <Player autoplay keepLastFrame src={card.animation.url}/>}
                <p className={styles.description}>{card.Description}</p>
                {(!card.animation || card.animation.url.length === 0) &&
                <Player autoplay keepLastFrame src={card.Points > 0 ? '/Sohcava.json' : '/Scheh.json'}/>}
            </a.div>
        </Html>
    ) : null;
};

export default CardContent;
