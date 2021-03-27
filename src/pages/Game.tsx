import React from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Game.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {RouteParams} from "../types/params";
import {useParams} from "react-router";
import TheDeck from "../components/Cards/TheDeck";
import {colors} from "../mixins/color";

const Game = () => {
    const {id}: RouteParams = useParams();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const drawClick = () => {
        console.color(`Tirer une carte`, colors.blue);
    }

    const jokerClick = () => {
        console.color(`joker`, colors.green);
    }

    const dirtClick = () => {
        console.color(`crasse`, colors.red);
    }
    return (
        <div className={styles.Game}>
            <TheHeader username={user.name} code={id}/>
            <TheProgressBar/>
            <div className={styles.GameCenter}><TheDeck number={5} deskClick={drawClick}/></div>
            <div className={styles.GameBottom}>
                <TheDeck number={2} color='green' deskClick={jokerClick}/>
                <TheDeck number={2} color='red' deskClick={dirtClick}/>
            </div>
        </div>
    );
}

export default Game;
