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
import TheCards from '../components/Cards/TheCards';
import TheModal from "../components/Modal/TheModal";
import useModal from "../hooks/useModal";

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
    const { isShowing: isUsersDisconnected, toggle: toggleUsersDisconnected } = useModal();


    useRedirect();

    useEffect(() => {
        const getPlayer = (player: User) => {
            setPlayer(player)
        }

        const userDisconnected = (isDisconnected: boolean) => {
            if(isDisconnected && !isUsersDisconnected) toggleUsersDisconnected()
            else if(!isDisconnected && isUsersDisconnected) toggleUsersDisconnected()
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

        const pickedCard = (card:Card) => {
            setCurrentCard(card);
            console.log('card picked', card)
        }

        socket.on('getPlayer', getPlayer);
        socket.on('userDisconnected', userDisconnected);
        socket.on('sendGuess', sendGuess);
        socket.on('startRoundEvent', eventRound);
        socket.on('endRoundEvent', eventRound);
        socket.on('checkpoint', checkpoint);
        socket.on('pickedCard', pickedCard);

        return () => {
            socket.off('getPlayer', getPlayer);
            socket.on('userDisconnected', userDisconnected);
            socket.off('sendGuess', sendGuess);
            socket.off('startRoundEvent', eventRound);
            socket.off('endRoundEvent', eventRound);
            socket.off('checkpoint', checkpoint);
            socket.off('pickedCard', pickedCard);
            setPlayer(undefined)
            setGuess(undefined)
        };
    }, [])


    const drawClick = () => {
        //socket.emit('nextRound', id)

        if(player && user.id === player.id) {
            console.color(`Tirer une carte`, colors.blue);
            socket.emit('deckClicked', id, player.key)
        } else {
            console.color(`Tu ne peux pas de tirer de carte`, colors.blue);
        }
    }

    const jokerClick = () => {
        if(player && currentCard && currentCard.Points < 0) {
            console.color(`joker`, colors.green);
            socket.emit('sendJoker', id, user.key, player.key)
        } else {
            console.color(`Tu ne peux pas de envoyer de carte joker`, colors.blue);
        }
    }

    const dirtClick = () => {
        if(player && user.id !== player.id && currentCard && currentCard.Points > 0) {
            console.color(`crasse`, colors.purple);
            socket.emit('sendDirt', id, user.key, player.key)

        } else {
            console.color(`Tu ne peux pas de envoyer de carte crasse`, colors.blue);
        }
    }

    return (
        <div className={styles.Game}>
            <TheHeader user={user} code={id}/>
            <TheProgressBar users={users} user={user} playerKey={player?.key}/>
            { (!triggerGuesses && !triggerOMG) &&
                <>
                    {player && <p style={{color: player.color}}>Au tour de {player.name}</p>}
                    <div className={styles.GameCenter}><TheDeck number={5} deskClick={drawClick} style={{opacity: (player && user.id === player.id) ? '1' : '0.5'}}/></div>
                    {currentCard && <div className={styles.GameCenter}><TheCards Description={currentCard.Description} /></div>}
                    <div className={styles.GameBottom}>
                        <TheDeck number={user.joker} color='green' deskClick={jokerClick} style={{opacity: (player && currentCard && currentCard.Points < 0) ? '1' : '0.5'}}/>
                        <TheDeck number={user.dirt} color='red' deskClick={dirtClick} style={{opacity: (player && user.id !== player.id && currentCard && currentCard.Points > 0) ? '1' : '0.5'}}/>
                    </div>
                </>
            }
            { (triggerGuesses && !triggerOMG) && <TheGuess roomId={id} question={guess?.question} users={users} userKey={user.key}/> }
            { (triggerOMG && !triggerGuesses) && <OhMyGod roomId={id} userKey={user.key}/> }
            <TheModal
                isShowing={isUsersDisconnected}
                hide={toggleUsersDisconnected}
                title="Quelqu’un est déconnecté"
                close={false}
            >
                Veuillez patienter
            </TheModal>
        </div>
    );
}

export default Game;
