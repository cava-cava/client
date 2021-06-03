import React, {FunctionComponent, useRef, useState} from "react";
import CardDeckFlippable from "./CardDeckFlippable";
import CardDeck from "./CardDeck";
import {Card} from "../../server/types/card";

type TheDeckProps = {
    showContent: boolean,
    active: boolean,
    userKey: number,
    numberCards: number,
    card: Card
    onClick: (event: Event) => void;
    debug?:boolean
};

const The3DDeck: FunctionComponent<TheDeckProps> = ({userKey, numberCards, showContent, active, card, onClick, debug = false}) => {
        const group = useRef();
        const [hovered, setHover] = useState(false);

        const position = (ratio:number) => {
            return [(ratio * 0.1), (ratio * 0.1), -(ratio * 0.015)]
        }

        return (
            <group
                ref={group}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={onClick}
            >
                {[...Array(numberCards)].map((x, index) =>
                    index <= userKey ?
                        <CardDeckFlippable hovered={hovered} active={active}
                                           basicPosition={position(index-userKey)}
                                           exit={index < userKey} key={index} card={card} debug={debug} showContent={showContent}/> : <CardDeck key={index} active={active} basicPosition={position(index-userKey)}/>
                )}
            </group>
        );
    }
;

export default The3DDeck;
