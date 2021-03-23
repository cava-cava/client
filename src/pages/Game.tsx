import React from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Game.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {RouteParams} from "../types/params";
import {useParams} from "react-router";

const Game = () => {
    const {id}: RouteParams = useParams();
    const user = useSelector((state: ApplicationState) => state.user.data);
    return (
        <div className={styles.Game}>
            <TheHeader username={user.name} code={id}/>
            <TheProgressBar/>
        </div>
    );
}

export default Game;
