import React, {useEffect, useState} from 'react';
import TheHeader from "../components/Game/Header/TheHeader";
import styles from './Game.module.scss'
import TheProgressBar from "../components/ProgressBar/TheProgressBar";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {RouteParams} from "../types/params";
import {useParams} from "react-router";
import TheDeck from "../components/Cards/TheDeck";
import {colors} from "../mixins/color";
import {socket} from "../socketClient";
import OhMyGod from "../components/Game/OhMyGod";
import {SET_USER, User} from "../store/user/types";
import useRedirect from "../hooks/useRedirect";
import useListUsers from "../hooks/useListUsers";
import TheGuess from "../components/Game/Guess/TheGuess";
import {Guess} from "../server/types/guess";
import {Card} from '../server/types/card'

const Game = () => {
    const dispatch = useDispatch();
    const {id}: RouteParams = useParams();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const users = useListUsers(id);
    const [player, setPlayer] = useState<User>();
    const [guess, setGuess] = useState<Guess>();
    const [triggerGuesses, setTriggerGuesses] = useState(false);
    const [triggerOMG, setTriggerOMG] = useState(false);
    const [currentCard, setCurrentCard] = useState<Card>()

    useRedirect();

    useEffect(() => {
        const getPlayer = (player: User) => {
            setPlayer(player)
        }

        const sendGuess = (guess: Guess) => {
            setGuess(guess)
        }

        const eventRound = (triggerGuesses: boolean, triggerOMG: boolean) => {
            setTriggerGuesses(triggerGuesses)
            setTriggerOMG(triggerOMG)
        }

        const checkpoint = (user:User) => {
            dispatch({type: SET_USER, payload: user});
        }

        socket.on('getPlayer', getPlayer);
        socket.on('sendGuess', sendGuess);
        socket.on('startRoundEvent', eventRound);
        socket.on('endRoundEvent', eventRound);
        socket.on('checkpoint', checkpoint);

        socket.on('getCard', (card:any) => {
            setCurrentCard(card);
        })
        return () => {
            socket.off('getPlayer', getPlayer);
            socket.off('sendGuess', sendGuess);
            socket.off('startRoundEvent', eventRound);
            socket.off('endRoundEvent', eventRound);
            socket.off('checkpoint', checkpoint);
            setPlayer(undefined)
            setGuess(undefined)
        };
    }, [])

    const drawClick = () => {
        console.color(`Tirer une carte`, colors.blue);
        socket.emit('getCard')
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
            { (!triggerGuesses && !triggerOMG) &&
                <>
                    <TheHeader username={user.name} code={id}/>
                    <TheProgressBar users={users} userPoints={user.points}/>
                    {player && <p style={{color: player.color}}>Au tour de {player.name}</p>}
                    <div className={styles.GameCenter}><TheDeck number={5} deskClick={drawClick}/></div>
                    <div className={styles.GameBottom}>
                        <TheDeck number={user.joker} color='green' deskClick={jokerClick}/>
                        <TheDeck number={user.dirt} color='red' deskClick={dirtClick}/>
                    </div>
                </>
            }
            { (triggerGuesses && !triggerOMG) && <TheGuess roomId={id} question={guess?.question} users={users} userKey={user.key}/> }
            { (triggerOMG && !triggerGuesses) && <OhMyGod roomId={id} userKey={user.key}/> }
        </div>
    );
}

export default Game;
