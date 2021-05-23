import React, {FunctionComponent, useRef} from 'react';
import {useTexture} from "@react-three/drei";
import textureSrc from '../../assets/png/deck.png'

type CardDeckProps = {
    position: any
}

const CardDeck: FunctionComponent<CardDeckProps> = ({position}) => {
    const mesh = useRef();
    const texture = useTexture(textureSrc)

    return (
        <mesh ref={mesh} position={position}>
            <planeBufferGeometry args={[2.75,4.5,1]}/>
            <meshBasicMaterial
                attach="material"
                map={texture}
                transparent={true}
            />
        </mesh>
    );
}

export default CardDeck;
