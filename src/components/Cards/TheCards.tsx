import React, { FunctionComponent } from "react";
import styles from "./TheCards.module.scss";

import lottie from "./../../assets/anims/teste/data.json";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import cardWaouh from "./../../assets/png/carte_waouh.png";
import cardCheh from "./../../assets/png/carte_cheh.png";

type TheCardsProps = {
  Description: string;
  points: number;
  animation: string;
  alternative: boolean;
};

const TheCards: FunctionComponent<TheCardsProps> = ({
  Description,
  points,
  animation,
  alternative
}) => {
  return (
    <div className={styles.TheCards}>
      <div className={`${styles.CardContainer} ${alternative ? styles.isAlternative : styles.regular}`}>
        <img
          className={styles.Card} 
          src={points > 0 ? cardWaouh : cardCheh}
          alt='carte'
        ></img>
        <Player autoplay loop src={animation} className={styles.anim} />
        <div className={`${styles.description} ${points > 0 ? styles.waouh : styles.cheh}`}>{Description}</div>
      </div>
    </div>
  );
};

export default TheCards;
