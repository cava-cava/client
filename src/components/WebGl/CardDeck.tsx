import React, {FunctionComponent, useRef} from 'react';
import {Plane, useTexture} from "@react-three/drei";
import textureSrc from '../../assets/png/deck.png'
import {a, useSpring} from "react-spring/three";

type CardDeckProps = {
    active: boolean
    basicPosition: any
}

const CardDeck: FunctionComponent<CardDeckProps> = ({active, basicPosition}) => {
    const texture = useTexture(textureSrc)
    const mesh = useRef();

    const {position} = useSpring({
        position: active ? [basicPosition[0], basicPosition[1], basicPosition[2] - 0.75] : basicPosition
    });

    return (
        <a.mesh ref={mesh} position={position}>
            <planeBufferGeometry args={[2, 3.75]}/>
            <meshBasicMaterial
                attach="material"
                map={texture}
                transparent={true}
            />
        </a.mesh>
    );
}

export default CardDeck;
