import React from 'react';
import styles from './Home.module.scss'
import {Link} from 'react-router-dom'
import homeImg from '../assets/jpg/accueil.jpeg'

const Home = () => {
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
