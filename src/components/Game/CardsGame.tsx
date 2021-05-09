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
import MessageGame from "./MessageGame";


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
        const pickedCard = (card:Card, isAlternative:boolean, ) => {
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

    return (
        <div className={`${styles.CardsGame} ${cardType === 'waouh' && styles.WaouhCard} ${cardType === 'cheh' && styles.ChehCard}` }>
            <TheHeader user={user} roomId={roomId} triggerGuesses={false}/>
            <TheProgressBar users={users} user={user} playerKey={player?.key}/>
            <MessageGame />
            <TheDeck number={5} roomId={roomId} player={player} userId={user.id} style={{opacity: (player && user.id === player.id) ? '1' : '0.5'}}/>
            {currentCard && <TheCards isAlternative={isAlternative} Description={currentCard.Description} points={currentCard.Points} animation={currentCard.animation}/>}
            <div>
                <TheBottomDeck number={user.joker} assets={[cardPiocheCava, cardPiocheJaune]} deskClick={jokerClick} style={{opacity: (player && currentCard && currentCard.Points < 0) ? '1' : '0.5'}}/>
                <TheBottomDeck number={user.dirt} assets={[cardPiocheCheh, cardPiocheNoir]} deskClick={dirtClick} style={{opacity: (player && user.id !== player.id && currentCard && currentCard.Points > 0) ? '1' : '0.5'}}/>
            </div>
        </div>
    )
}

export default CardsGame;
