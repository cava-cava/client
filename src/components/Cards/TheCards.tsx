import React, { FunctionComponent } from "react";
import styles from "./TheCards.module.scss";

import lottie from "./../../assets/anims/teste/data.json";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import cardWaouh from "./../../assets/png/carte_waouh.png";
import cardCheh from "./../../assets/png/carte_cheh.png";

type TheCardsProps = {
  Description: string;
  points: number;
};

const TheCards: FunctionComponent<TheCardsProps> = ({
  Description,
  points,
}) => {
  return (
    <div className={styles.TheCards}>
      <div className={styles.CardContainer}>
        <img
          className={styles.Card}
          src={points > 0 ? cardWaouh : cardCheh}
          alt='carte'
        ></img>
        <Player autoplay loop src={lottie} className={styles.anim} />
        <div className={styles.description}>{Description}</div>
      </div>
    </div>
  );
};

export default TheCards;
