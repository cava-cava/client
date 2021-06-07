import React, {FunctionComponent, Suspense, useEffect, useState} from 'react';
import styles from "./CardsGame.module.scss";
import TheBottomDeck from "../Cards/TheBottomDeck";
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
import WaitingUsers from "../Users/WaitingUsers";
import TheCanvas from "../WebGl/TheCanvas";
import The3DDeck from "../WebGl/The3DDeck";
import CardsActions from "../WebGl/CardsActions";
import VideoBackgroundGame from "./Card/VideoBackgroundGame";
import useSoundEffect from "../../hooks/useSoundEffect";


type CardsGameProps = {
    users: User[]
    player?: User
    user: User
    roomId: string
}

const CardsGame: FunctionComponent<CardsGameProps> = ({users, player, user, roomId}) => {
    const [currentCard, setCurrentCard] = useState<Card>()
    const [cardsActions, setCardsActions] = useState<Card[]>([])
    const [active, setActive] = useState(false)
    const {sound, setSource} = useSoundEffect("", true)

    const canUseJoker = (player && ((currentCard && currentCard.Points < 0 && cardsActions.length === 0) || (cardsActions.length > 0 && cardsActions[cardsActions.length - 1].Points < 0 )))
    const canUseDirt = (player && user.id !== player.id && ((currentCard && currentCard.Points > 0 && cardsActions.length === 0) || (cardsActions.length > 0 && cardsActions[cardsActions.length - 1].Points > 0 )))
    const  canUseDeck = cardsActions.length === 0 && player && (user.key === player.key)

    const jokerClick = () => {
        if(canUseJoker && player) {
            console.color(`joker`, colors.green);
            socket.emit('sendJoker', roomId, user.key, player.key)
        } else {
            console.color(`Tu ne peux pas de envoyer de carte joker`, colors.blue);
        }
    }

    const dirtClick = () => {
        if(canUseDirt && player) {
            console.color(`crasse`, colors.purple);
            socket.emit('sendDirt', roomId, user.key, player.key)
        } else {
            console.color(`Tu ne peux pas de envoyer de carte crasse`, colors.blue);
        }
    }

    const deckClick = (event: Event) => {
        event.stopPropagation()
        if(canUseDeck && player) {
            console.color(`Tirer une carte`, colors.blue);
            socket.emit('deckClicked', roomId, player.key)
        } else {
            console.color(`Tu ne peux pas de tirer de carte`, colors.blue);
        }
    }

    const playSoundCard = (card:Card) => {
        if(card && card.audio && card.audio.url.length > 0) {
            console.log(card.audio.url)
            setSource(card.audio.url)
        }
    }

    useEffect(() => {
        const pickedCard = (card:Card) => {
            setCurrentCard(card);
            setActive(true)
            playSoundCard(card)
        }

        const addAlternativeCard = (card:Card) => {
            setCardsActions(oldCardsActions => [...oldCardsActions, card]);
            playSoundCard(card)
        }

        const setAlternativeCard = (cards:Card[]) => {
            setCardsActions(cards)
            playSoundCard(cards[cards.length-1])
        }

        const clearCards = () => {
            setCurrentCard(undefined);
            setCardsActions([])
            setActive(false)
        }

        socket.on('pickedCard', pickedCard);
        socket.on('addAlternativeCard', addAlternativeCard);
        socket.on('setAlternativeCard', setAlternativeCard);
        socket.on('clearCards', clearCards);

        return () => {
            socket.off('pickedCard', pickedCard);
            socket.off('addAlternativeCard', addAlternativeCard);
            socket.on('setAlternativeCard', setAlternativeCard);
            socket.off('clearCards', clearCards);
            setCurrentCard(undefined);
            setCardsActions([])
            setActive(false)
        };
    }, [])

    return (
        <div className={`${styles.CardsGame}` }>
            <TheHeader user={user} roomId={roomId} triggerGuesses={false}/>
            <TheProgressBar users={users} user={user} playerKey={player?.key}/>
            {users.filter(user => user.isReady).length === users.length ?
                <>
                    <MessageGame />
                    <div className={styles.CardsGameCanvas}>
                        <TheCanvas>
                            <Suspense fallback={null}>
                                <The3DDeck onClick={deckClick} numberCards={users.length} userKey={user.key} playerKey={player?.key || 0} active={active} card={currentCard} showContent={!!(active && cardsActions.length === 0)}/>
                                <CardsActions cards={cardsActions}/>
                            </Suspense>
                        </TheCanvas>
                        <VideoBackgroundGame play={cardsActions.length > 0 || active} card={cardsActions.length > 0 ? cardsActions[cardsActions.length - 1] : active ? currentCard : undefined}/>
                    </div>
                    <div className={styles.CardsGameBottom}>
                        <TheBottomDeck number={user.joker} assets={[cardPiocheCava, cardPiocheJaune]} deskClick={jokerClick} style={{opacity: (canUseJoker) ? '1' : '0.5', marginRight: 'auto'}}/>
                        <TheBottomDeck number={user.dirt} assets={[cardPiocheCheh, cardPiocheNoir]} deskClick={dirtClick} style={{opacity: (canUseDirt) ? '1' : '0.5', marginLeft: 'auto'}}/>
                    </div>
                </>
            :
                <section>
                    <WaitingUsers text="En attente des autres joueurs..."  users={users.filter(user => !user.isReady)}/>
                </section>
            }
        </div>
    )
}

export default CardsGame;
