import React, { FunctionComponent } from "react";
import styles from "./TheCards.module.scss";

import lottie from "./../../assets/anims/teste/data.json";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import cardWaouh from "./../../assets/png/carte_waouh.png";

type TheCardsProps = {
  Description: string;
};

const TheCards: FunctionComponent<TheCardsProps> = ({ Description }) => {
  return (
    <div className={styles.TheCards}>
      <div className={styles.CardContainer}>
        <img className={styles.Card} src={cardWaouh}></img>
        <Player autoplay loop src={lottie} className={styles.anim} />
        <div className={styles.description}>{Description}</div>
      </div>
    </div>
  );
};

export default TheCards;
