import React, {useEffect} from 'react';
import styles from './Home.module.scss'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {SET_HOMEPAGE_SETTINGS} from "../store/settings/types";
import logoAnimation from '../assets/mp4/logo.mp4'

const Home = () => {
    const dispatch = useDispatch();
    const homepage = useSelector((state: ApplicationState) => state.settings.data.homepage);

    useEffect(() => {
        if(!homepage) dispatch({type: SET_HOMEPAGE_SETTINGS, payload: true})
    }, [])

    return (
        <div className={styles.Home}>
            <video src={logoAnimation} autoPlay={true} muted={true}/>
            <p>Le jeu complètement déjanté qui
                vous fera relativiser sur le bonheur !</p>
            <Link to="/setup">Jouer !</Link>
        </div>
    );
}

export default Home;
