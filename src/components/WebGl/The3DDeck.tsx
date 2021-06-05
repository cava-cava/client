import React, {FunctionComponent, useRef, useState} from "react";
import CardDeckFlippable from "./CardDeckFlippable";
import CardDeck from "./CardDeck";
import {Card} from "../../server/types/card";

type TheDeckProps = {
    showContent: boolean,
    active: boolean,
    userKey: number
    playerKey: number,
    numberCards: number,
    card?: Card
    onClick: (event: Event) => void;
    debug?:boolean
};

const The3DDeck: FunctionComponent<TheDeckProps> = ({userKey, playerKey, numberCards, showContent, active, card, onClick, debug = false}) => {
        const group = useRef();
        const canHover = userKey === playerKey
        const [hovered, setHover] = useState(false);

        const position = (ratio:number) => {
            return [(ratio * 0.1), (ratio * 0.1) - 0.25, -(ratio * 0.015)]
        }

        return (
            <group
                ref={group}
                onPointerDown={onClick}
                onPointerOver={() => canHover && setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {[...Array(numberCards)].map((x, index) =>
                    index <= playerKey ?
                        <CardDeckFlippable hovered={hovered} active={active}
                                           basicPosition={position(index-playerKey)}
                                           exit={index < playerKey} key={index} card={card} debug={debug} showContent={showContent}/> : <CardDeck key={index} active={active} basicPosition={position(index-playerKey)}/>
                )}
            </group>
        );
    }
;

export default The3DDeck;
