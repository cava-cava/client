import React, {FunctionComponent} from "react";
import {Html} from "@react-three/drei";
import {Card} from "../../server/types/card";
import styles from "./CardContent.module.scss";
import {Player} from "@lottiefiles/react-lottie-player";

type CardContentProps = {
    position: any
    rotation: number
    card: Card
    debug?: boolean
};

const CardContent: FunctionComponent<CardContentProps> = ({
                                                              position,
                                                              rotation,
                                                              card,
                                                              debug = false
                                                          }) => {
    return (
        <Html
            className={styles.CardContent}
            position={position}
            style={debug ? {border: '1px solid red', transform: `rotate(${rotation}rad)`} : {transform: `rotate(${rotation}rad)`} }
        >
            {card.animation && <Player autoplay keepLastFrame src={card.animation.url}/>}
            <p className={styles.description}>Lorem ipsum dolor mes couilles au bord de l'eau</p>
            {!card.animation &&
            <Player autoplay keepLastFrame src={card.Points > 0 ? '/Sohcava.json' : '/Scheh.json'}/>}
        </Html>
    );
};

export default CardContent;
