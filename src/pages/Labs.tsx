import styles from "./Labs.module.scss";
// three
import { Canvas } from "@react-three/fiber";
import OrbitControls from "../components/OrbitControls/OrbitControls";

import TheBottomDeck from "../components/Cards/TheBottomDeck";

import cardCheh from "./../assets/png/carte_cheh.png";
import cardWaouh from "./../assets/png/carte_waouh.png";
import cardPiocheCheh from "./../assets/png/carte_pioche_cheh.png";
import cardPiocheNoir from "./../assets/png/carte_pioche_noir.png";
import cardPiocheCava from "./../assets/png/carte_pioche_oh_ca_va.png";
import cardPiocheJaune from "./../assets/png/carte_pioche_jaune.png";
import lottie from "./../assets/anims/teste/data.json";

import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Labs = () => {
  return (
    <div className={styles.Labs}>
      {/* <Canvas shadows camera={{ position: [0, 0, 5] }}>
        <ThreeCard />
        <OrbitControls />
      </Canvas> */}
      {/* <button onClick={() => }>FLIP</button>  */}
      <div className={styles.LabsInner}>
        <div className={styles.CardContainer}>
          <img className={styles.Card} src={cardWaouh}></img>
          <Player autoplay loop src={lottie} className={styles.anim} />
          <div className={styles.description}>
            Tu décide d’aller chez le coiffeur. Mais il te rate et tu es super
            badass
          </div>
        </div>

        {/* <div className={styles.Pioche}>
          <div className={styles.container}>
            <img className={styles.Cheh} src={cardPiocheCheh}></img>
          </div>
          <div className={styles.container}>
            <img className={styles.Cava} src={cardPiocheCava}></img>
          </div>
        </div> */}

        <div className={styles.Pioche}>
          <div className={styles.container}>
            <TheBottomDeck number={2} joker={false} assets={[cardPiocheCheh, cardPiocheNoir]} />
          </div>
          <div className={styles.container}>
            <TheBottomDeck number={2} joker={true} assets={[cardPiocheCava, cardPiocheJaune]}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
