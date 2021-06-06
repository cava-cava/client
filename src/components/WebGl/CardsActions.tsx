import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {Plane, useTexture} from "@react-three/drei";
import {a} from "react-spring/three";
import {Card} from "../../server/types/card";
import textureSrcOhCaVa from "../../assets/png/carte_oh_ca_va.png";
import textureSrcCheh from "../../assets/png/carte_cheh.png";
import {useTransition} from "react-spring";
import {getRandom} from "../../mixins/getRandom";
import CardContent from "./CardContent";

type CardsActionsProps = {
    cards: Card[]
    debug?: boolean
};

const CardsActions: FunctionComponent<CardsActionsProps> = ({cards, debug = false}) => {
    const mesh = useRef();
    const textureOhCaVa = useTexture(textureSrcOhCaVa)
    const textureCheh = useTexture(textureSrcCheh)
    const [cardsActions, setCardsActions] = useState<any[]>([])

    useEffect(() => {
        let tmpCardsActions: any[] = []
        cards.map((card, index) => {
            if (cardsActions[index]) {
                tmpCardsActions.push(cardsActions[index])
            } else {
                tmpCardsActions.push({
                    ...cards[index],
                    key: index,
                    rotationZ: Math.PI * getRandom(-0.05, 0.05)
                })
            }
        })
        setCardsActions(tmpCardsActions)
    }, [cards])

    const transitions = useTransition(cardsActions, {
        from: {position: [2, -5, 0.5]},
        enter: {position: [0, -0.25, 0.5]},
        leave: {position: [5, -0.25, 0.5]},
    })


    return (
        <>
            {transitions(({position, key}: any, card) => (
                <a.mesh
                    ref={mesh}
                    position={position}
                    rotation-z={card.rotationZ}
                    key={key}
                >
                    <planeBufferGeometry args={[2.25, 4]}/>
                    <meshBasicMaterial
                        attach="material"
                        map={card.Points > 0 ? textureOhCaVa : textureCheh}
                        transparent={true}
                    />
                    <CardContent isAlternative={true} card={card} position={[0, 0, 0]} rotation={-card.rotationZ}
                                 debug={debug} show={card.key === cards.length - 1}/>
                </a.mesh>)
            )}
        </>

    );
};

export default CardsActions;
