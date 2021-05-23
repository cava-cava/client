import React, {FunctionComponent, Suspense, useRef, useState} from 'react';
import CardDeck from "./CardDeck";

type TheDeckProps = {
    handleClick?: () => void
}

const TheDeck: FunctionComponent<TheDeckProps> = ({handleClick}) => {
    const group = useRef();
    const [hovered, setHover] = useState(false)


    return (
        <group ref={group}
              onPointerOver={(event) => setHover(true)}
              onPointerOut={(event) => setHover(false)}>
            <CardDeck position={[0.3,-0.3,-0.002]} />
            <CardDeck position={[0.15,-0.15,-0.001]} />
            <CardDeck position={hovered ? [0.3,0,0] : [0,0,0]} />
        </group>
    );
}

export default TheDeck;
