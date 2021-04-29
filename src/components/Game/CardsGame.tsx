import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from "../../pages/Game.module.scss";
import TheDeck from "../Cards/TheDeck";
import TheCards from "../Cards/TheCards";
import {colors} from "../../mixins/color";
import {socket} from "../../socketClient";
import {User} from "../../store/user/types";
import {Card} from "../../server/types/card";

type TheGameProps = {
    player?: User
    user: User
    roomId: string
}

const TheGame: FunctionComponent<TheGameProps> = ({player, user, roomId}) => {
    const [currentCard, setCurrentCard] = useState<Card>()

    const drawClick = () => {
        if(player && user.id === player.id) {
            console.color(`Tirer une carte`, colors.blue);
            socket.emit('deckClicked', roomId, player.key)
        } else {
            console.color(`Tu ne peux pas de tirer de carte`, colors.blue);
        }
    }

    const jokerClick = () => {
        if(player && currentCard && currentCard.Points < 0) {
            console.color(`joker`, colors.green);
            socket.emit('sendJoker', roomId, user.key, player.key)
        } else {
            console.color(`Tu ne peux pas de envoyer de carte joker`, colors.blue);
        }
    }

    const dirtClick = () => {
        if(player && user.id !== player.id && currentCard && currentCard.Points > 0) {
            console.color(`crasse`, colors.purple);
            socket.emit('sendDirt', roomId, user.key, player.key)

        } else {
            console.color(`Tu ne peux pas de envoyer de carte crasse`, colors.blue);
        }
    }

    useEffect(() => {
        const pickedCard = (card:Card) => {
            setCurrentCard(card);
            console.log('card picked', card)
        }
        socket.on('pickedCard', pickedCard);
        return () => {
            socket.off('pickedCard', pickedCard);
        };
    }, [])
    return (
        <>
            {player && <p style={{color: player.color}}>Au tour de {player.name}</p>}
            <div className={styles.GameCenter}><TheDeck number={5} deskClick={drawClick} style={{opacity: (player && user.id === player.id) ? '1' : '0.5'}}/></div>
            {currentCard && <div className={styles.GameCenter}><TheCards Description={currentCard.Description} points={currentCard.Points}/></div>}
            <div className={styles.GameBottom}>
                <TheDeck number={user.joker} color='green' deskClick={jokerClick} style={{opacity: (player && currentCard && currentCard.Points < 0) ? '1' : '0.5'}}/>
                <TheDeck number={user.dirt} color='red' deskClick={dirtClick} style={{opacity: (player && user.id !== player.id && currentCard && currentCard.Points > 0) ? '1' : '0.5'}}/>
            </div>
        </>
    )
}

export default TheGame;
