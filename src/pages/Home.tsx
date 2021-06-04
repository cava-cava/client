import React, { useEffect, useRef } from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../store";
import { SET_HOMEPAGE_SETTINGS } from "../store/settings/types";
import logoAnimation from "../assets/mp4/test_logo.mp4";
import { mainModule } from "node:process";

const Home = () => {
  const dispatch = useDispatch();
  const homepage = useSelector(
    (state: ApplicationState) => state.settings.data.homepage
  );

  const videoParentRef = useRef();
  const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
  };

  useEffect(() => {
    if (!homepage) dispatch({ type: SET_HOMEPAGE_SETTINGS, payload: true });
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari() && videoParentRef.current) {
      // @ts-ignore: Object is possibly 'null'.
      videoParentRef!.current!.play();
    }
  }, []);



  return (
    <div className={styles.Home}>
      <video playsInline src={logoAnimation} autoPlay={true} loop={false} muted={true} controls={false} />
      <p>Le jeu de soirée pour les gens complètement déprimés !</p>
      <Link to="/setup">Jouer !</Link>
    </div>
  );
};

export default Home;
