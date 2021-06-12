import React, {Suspense, useEffect, useRef, useState} from "react";
import TheCanvas from "../components/WebGl/TheCanvas";
import The3DDeck from "../components/WebGl/The3DDeck";
import CardsActions from "../components/WebGl/CardsActions";
import * as dat from 'dat.gui';
import InputFile from "../components/gui/InputFile";
import VideoBackgroundGame from "../components/Game/Card/VideoBackgroundGame";
import styles from './Cards.module.scss'
import {Card} from "../server/types/card";

const Cards = () => {
    const myInputCard = useRef<any>()
    const myInputAlternative = useRef<any>()
    const [animationCard, setAnimationCard] = useState("")
    const [animationAlternative, setAnimationAlternative] = useState("")
    const [active, setActive] = useState(false)
    const [numberUsers, setNumberUsers] = useState<number>(4)
    const [userKey, setUserKey] = useState<number>(0)
    const [showControls, setShowControls] = useState(false)
    const [cardsActions, setCardsActions] = useState<Card[]>([])
    const [descriptionCardAction, setDescriptionCardAction] = useState("Lorem ipsum dolor mes couilles au bord de l'eau")
    const [pointsCardAction, setPointsCardAction] = useState<number>(10)
    const [card, setCard] = useState<Card>({
        id: 0,
        Description: "Lorem ipsum dolor mes couilles au bord de l'eau",
        Points: 10,
        Alternative: [],
    })
    const [descriptionCard, setDescriptionCard] = useState("Lorem ipsum dolor mes couilles au bord de l'eau")
    const [pointsCard, setPointsCard] = useState<number>(10)

    const onClick = (event: Event) => {
        event.stopPropagation()
        if(cardsActions.length > 0) return;
        setActive(true)
    }

    useEffect(() => {
        const parameters = {
            showControls: showControls,
            numberUsers: numberUsers,
            userKey: userKey,
            descriptionCard: descriptionCard,
            pointsCard: pointsCard,
            descriptionCardAction: descriptionCardAction,
            pointsCardAction: pointsCardAction,
            deckClick: () => {
                setActive(true)
            },
            nextCard: () => {
                setActive(false)
            },
            loadCard: () => {
                if (null !== myInputCard.current) {
                    myInputCard.current.click();
                }
            },
            loadAlternative: () => {
                if (null !== myInputAlternative.current) {
                    myInputAlternative.current.click();
                }
            },
            pushCard: () => {
                setCard({
                    id:0,
                    Description: descriptionCard,
                    Points:  pointsCard,
                    animation: {
                        url: animationCard
                    },
                    Alternative: [],
                })
            },
            pushCardAction: () => {
                const cardAction:Card = {
                    id:0,
                    Description: descriptionCardAction,
                    Points:  pointsCardAction,
                    animation: {
                        url: animationAlternative
                    },
                    Alternative: [],
                }
                const cards:Card[] = [...cardsActions]
                cardsActions.push(cardAction)
                setCardsActions(cards)
            },
            clearCardsActions: () => {
                setCardsActions([])
            }
        }
        const gui = new dat.GUI();
        const generalGui = gui.addFolder("General")
        generalGui.open()
        generalGui.add(parameters, 'showControls').name('Show Controls animation').onChange(value => setShowControls(value));
        const deckGui = gui.addFolder("Deck")
        deckGui.open()
        deckGui.add(parameters, 'numberUsers').name('Set number User').step(1).min(4).max(6).onChange(value => {
            setNumberUsers(value)
        });
        deckGui.add(parameters, 'userKey').name('Set active number user').step(1).min(0).max(6).onChange(value => {
            setUserKey(value)
            setActive(false)
        });
        deckGui.add(parameters, 'deckClick').name('click Deck');
        deckGui.add(parameters, 'nextCard').name('Next Card');
        const cardGui = gui.addFolder("Card")
        cardGui.open()
        cardGui.add(parameters, 'descriptionCard').name('Set Description for Card Deck').onFinishChange(value => {
            setDescriptionCard(value)
        });
        cardGui.add(parameters, 'pointsCard').name('Set Points for Card Deck').step(1).min(-25).max(25).onChange(value => {
            setPointsCard(value)
        });
        cardGui.add(parameters, 'loadCard').name('Load Animation Card');
        cardGui.add(parameters, 'pushCard').name('Update Card');
        const alternativeGui = gui.addFolder("Alternative Card")
        alternativeGui.open()
        alternativeGui.add(parameters, 'descriptionCardAction').name('Set Description for card Action/Alternative').onFinishChange(value => {
            setDescriptionCardAction(value)
        });
        alternativeGui.add(parameters, 'pointsCardAction').name('Set Points for card Action/Alternative').step(1).min(-25).max(25).onChange(value => {
            setPointsCardAction(value)
        });
        alternativeGui.add(parameters, 'loadAlternative').name('Load Alternative Animation Card');
        alternativeGui.add(parameters, 'pushCardAction').name('Push Card Action/Alternative');
        alternativeGui.add(parameters, 'clearCardsActions').name('Clear all cards Action/Alternative');

        return () => {
            gui.destroy()
        }
    }, [pointsCard, descriptionCard, pointsCardAction, descriptionCardAction, animationCard, animationAlternative])

  return (
      <div className={styles.Cards}>
          <TheCanvas>
              <Suspense fallback={null}>
                  <The3DDeck userKey={userKey} onClick={onClick} numberCards={numberUsers} playerKey={userKey} active={active} card={card} debug={true} showContent={!!(active && cardsActions.length === 0)}/>
                  <CardsActions cards={cardsActions} debug={true}/>
              </Suspense>
          </TheCanvas>
          <VideoBackgroundGame play={cardsActions.length > 0 || active} card={cardsActions.length > 0 ? cardsActions[cardsActions.length - 1] : active ? card : undefined}/>
          <InputFile refs={myInputCard} setValue={setAnimationCard}/>
          <InputFile refs={myInputAlternative} setValue={setAnimationAlternative}/>
      </div>
  );
};

export default Cards;
