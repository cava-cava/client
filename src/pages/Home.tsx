import React, {useEffect, useState} from "react";
import styles from "./Home.module.scss";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {SET_HOMEPAGE_SETTINGS} from "../store/settings/types";
import ReactPlayer from "react-player";

const Home = () => {
    const dispatch = useDispatch();
    const homepage = useSelector(
        (state: ApplicationState) => state.settings.data.homepage
    );
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        if (!homepage) dispatch({type: SET_HOMEPAGE_SETTINGS, payload: true});
    }, []);

    const onReady = () => {
        setPlaying(true)
    }

    return (
        <div className={styles.Home}>
            <ReactPlayer url={"/mp4/logo.mp4"} playing={playing} playsinline={true} loop={false} muted={true}
                                    controls={false} width='100%' height='70%' onReady={onReady} style={{opacity: playing ? 1 : 0}}/>
            <p>Le jeu de soirée pour les gens complètement déprimés !</p>
            <Link to="/setup">Jouer !</Link>
        </div>
    );
};

export default Home;
