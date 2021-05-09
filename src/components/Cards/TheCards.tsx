import React, {FunctionComponent} from "react";
import styles from "./TheCards.module.scss";
import {Player} from "@lottiefiles/react-lottie-player";
import cardWaouh from "./../../assets/png/carte_waouh.png";
import cardOutch from "./../../assets/png/carte_outch.png";
import cardCheh from "./../../assets/png/carte_cheh.png";
import cardOhCaVa from "./../../assets/png/carte_oh_ca_va.png";
import {FileStrapi} from "../../server/types/fileStrapi";

type TheCardsProps = {
    Description: string;
    points: number;
    animation?: FileStrapi;
    isAlternative: boolean;
};

const TheCards: FunctionComponent<TheCardsProps> = ({
                                                        Description,
                                                        points,
                                                        animation,
                                                        isAlternative
                                                    }) => {
    return (
        <div className={`${styles.TheCards} ${isAlternative && styles.TheCardsIsAlternative}`}>
            <img
                src={!isAlternative ? (points > 0 ? cardWaouh : cardOutch) : (points > 0 ? cardOhCaVa : cardCheh)}
                alt='carte'
            />
            <Player autoplay src={animation ? animation.url : (points > 0) ? '/Sohcava.json' : '/Scheh.json'}/>
            <div
                className={`${styles.description} ${(isAlternative && points < 0) && styles.TheCardsIsCheh}`}>{Description}</div>
        </div>
    );
};

export default TheCards;
