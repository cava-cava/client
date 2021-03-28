import React, {useEffect, useState} from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Game.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {RouteParams} from "../types/params";
import {useHistory, useParams} from "react-router";
import TheDeck from "../components/Cards/TheDeck";
import {colors} from "../mixins/color";
import {socket} from "../socketClient";
import OhMyGod from "../components/Game/OhMyGod";

const Game = () => {
    const {id}: RouteParams = useParams();
    const history = useHistory();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const [idUser, setIdUser] = useState(0);
    const [OMG, setOMG] = useState(false);
    const drawClick = () => {
        console.color(`Tirer une carte`, colors.blue);
        socket.emit('nextRound', id)
    }

    const jokerClick = () => {
        console.color(`joker`, colors.green);
    }

    const dirtClick = () => {
        console.color(`crasse`, colors.red);
    }

    socket.on('getIdUser', (idUser: number) => {
        setIdUser(idUser)
    });

    socket.on('redirect', (path: string) => history.push(path));

    socket.on('startOMG', () => {
        setOMG(true)
    });

    socket.on('endOMG', () => {
        setOMG(false)
    });

    return (
        <div className={styles.Game}>
            <TheHeader username={user.name} code={id}/>
            <TheProgressBar/>
            {
                OMG ?
                    <OhMyGod/>
                    :
                    <>
                        <p>Au tour de {idUser}</p>
                        <div className={styles.GameCenter}><TheDeck number={5} deskClick={drawClick}/></div>
                        <div className={styles.GameBottom}>
                            <TheDeck number={2} color='green' deskClick={jokerClick}/>
                            <TheDeck number={2} color='red' deskClick={dirtClick}/>
                        </div>
                    </>
            }
        </div>
    );
}

export default Game;
