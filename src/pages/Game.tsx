import React, {useEffect, useState} from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Game.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {RouteParams} from "../types/params";
import {useParams} from "react-router";
import TheDeck from "../components/Cards/TheDeck";
import {colors} from "../mixins/color";
import {socket} from "../socketClient";
import OhMyGod from "../components/Game/OhMyGod";
import {User} from "../store/user/types";
import useRedirect from "../hooks/useRedirect";

const Game = () => {
    const {id}: RouteParams = useParams();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const [player, setPlayer] = useState<User>();
    const [OMG, setOMG] = useState(false);

    useRedirect();

    useEffect(() => {
        const getPlayer = (player: User) => {
            setPlayer(player)
        }

        const startOMG = () => {
            setOMG(true)
        }

        const endOMG = () => {
            setOMG(false)
        }

        socket.on('getPlayer', getPlayer);
        socket.on('startOMG', startOMG);
        socket.on('endOMG', endOMG);

        socket.emit('getPlayer', id);
        return () => {
            socket.off('getPlayer', getPlayer);
            socket.off('startOMG', startOMG);
            socket.off('endOMG', endOMG);
            setPlayer(undefined)
        };
    }, [])

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

    return (
        <div className={styles.Game}>
            <TheHeader username={user.name} code={id}/>
            <TheProgressBar/>
            {
                OMG ?
                    <OhMyGod roomId={id} userId={user.key}/>
                    :
                    <>
                        {player && <p style={{color: player.color}}>Au tour de {player.name}</p>}
                        <div className={styles.GameCenter}><TheDeck number={5} deskClick={drawClick}/></div>
                        <div className={styles.GameBottom}>
                            <TheDeck number={user.joker} color='green' deskClick={jokerClick}/>
                            <TheDeck number={user.dirt} color='red' deskClick={dirtClick}/>
                        </div>
                    </>
            }
        </div>
    );
}

export default Game;
