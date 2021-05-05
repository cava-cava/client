import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from "./CardsGame.module.scss";
import TheDeck from "../Cards/TheDeck";
import TheBottomDeck from "../Cards/TheBottomDeck";
import TheCards from "../Cards/TheCards";
import {colors} from "../../mixins/color";
import {socket} from "../../socketClient";
import {User} from "../../store/user/types";
import {Card} from "../../server/types/card";

import cardPiocheCheh from "./../../assets/png/carte_pioche_cheh.png";
import cardPiocheNoir from "./../../assets/png/carte_pioche_noir.png";
import cardPiocheCava from "./../../assets/png/carte_pioche_oh_ca_va.png";
import cardPiocheJaune from "./../../assets/png/carte_pioche_jaune.png";
import TheHeader from "./Header/TheHeader";
import TheProgressBar from "../ProgressBar/TheProgressBar";
import { isWebGL2Available } from '@react-three/drei';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'node:constants';

type CardsGameProps = {
    users: User[]
    player?: User
    user: User
    roomId: string
}

const CardsGame: FunctionComponent<CardsGameProps> = ({users, player, user, roomId}) => {
    const [currentCard, setCurrentCard] = useState<Card>()
    const [isAlternative, setIsAlternative] = useState<boolean>(false)
    const [cardType, setCardType] = useState<string>('')

    const [billboardText, setBillboardText] = useState('')

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
        const pickedCard = (card:Card, isAlternative:boolean) => {
            setCurrentCard(card);
            if(card){
                if(card.Points > 0){
                    setCardType('waouh')
                }
                else {
                    setCardType('cheh')
                }
            } else setCardType('')
            setIsAlternative(isAlternative);
            console.log('card picked', card)
        }
        socket.on('pickedCard', pickedCard);
        return () => {
            socket.off('pickedCard', pickedCard);
        };
    }, [])


    useEffect(() => {
        if(isAlternative)
        setBillboardText(`${player?.name} t'a mis un carte action `)
        else
        setBillboardText(`Au tour de ${player?.name}`)
        
    }, [player, isAlternative])


    return (
        <div className={`${styles.CardsGame} ${cardType === 'waouh' && styles.WaouhCard} ${cardType === 'cheh' && styles.ChehCard}` }>
            <TheHeader user={user} roomId={roomId} triggerGuesses={false}/>
            <TheProgressBar users={users} user={user} playerKey={player?.key}/>
            {/* {player && <p style={{color: player.color}}>Au tour de {player.name}</p>} */}
            <div className={styles.billBoard}>{player && <p>{billboardText}</p>}</div>
            <div className={styles.GameCenter}><TheDeck number={5} deskClick={drawClick} style={{opacity: (player && user.id === player.id) ? '1' : '0.5'}}/></div>
            {currentCard && <div className={styles.GameCenter}><TheCards isAlternative={isAlternative} Description={currentCard.Description} points={currentCard.Points} animation={currentCard.animation}/></div>}
            <div className={styles.Pioche}>
                <div className={styles.container}>
                    <TheBottomDeck number={user.joker} assets={[cardPiocheCava, cardPiocheJaune]} deskClick={jokerClick} style={{opacity: (player && currentCard && currentCard.Points < 0) ? '1' : '0.5'}}/>
                </div>
                <div className={styles.container}>
                    <TheBottomDeck number={user.dirt} assets={[cardPiocheCheh, cardPiocheNoir]} deskClick={dirtClick} style={{opacity: (player && user.id !== player.id && currentCard && currentCard.Points > 0) ? '1' : '0.5'}}/>
                </div>
            </div>
        </div>
    )
}

export default CardsGame;
