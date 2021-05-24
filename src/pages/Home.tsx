import React, {useEffect} from 'react';
import styles from './Home.module.scss'
import {Link} from 'react-router-dom'
import homeImg from '../assets/jpg/accueil.jpeg'
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {SET_HOMEPAGE_SETTINGS} from "../store/settings/types";

const Home = () => {
    const dispatch = useDispatch();
    const homepage = useSelector((state: ApplicationState) => state.settings.data.homepage);

    useEffect(() => {
        if(!homepage) dispatch({type: SET_HOMEPAGE_SETTINGS, payload: true})
    }, [])

    return (
        <div className={styles.Home}>
            <img src={homeImg} alt="ça va ça va"/>
            <p>Le jeu complètement déjanté qui
                vous fera relativiser sur le bonheur !</p>
            <Link to="/setup">Jouer !</Link>
        </div>
    );
}

export default Home;
