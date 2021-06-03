import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {Box, Html, useTexture} from "@react-three/drei";
import textureSrcBack from "../../assets/png/deck.png";
import {useSpring, a} from "react-spring/three";
import textureSrcFrontWaouh from "../../assets/png/carte_waouh.png";
import textureSrcFrontOutch from "../../assets/png/carte_outch.png";
import {Card} from "../../server/types/card";
import CardContent from "./CardContent";
import {getRandom} from "../../mixins/getRandom";

type CardDeckFlippableProps = {
    hovered: boolean;
    active: boolean;
    showContent: boolean
    basicPosition: any;
    exit: boolean;
    card: Card;
    debug?: boolean
};

const CardDeckFlippable: FunctionComponent<CardDeckFlippableProps> = ({
                                                                          hovered,
                                                                          active,
                                                                          showContent,
                                                                          exit,
                                                                          basicPosition,
                                                                          card,
                                                                          debug = false
                                                                      }) => {
    const [show, setShow] = useState(true)
    const [hasBeenActive, setHasBeenActive] = useState(false)
    const idRef = useRef<any>();
    const mesh = useRef();
    const textureBack = useTexture(textureSrcBack);
    const textureFrontWaouh = useTexture(textureSrcFrontWaouh)
    const textureFrontOutch = useTexture(textureSrcFrontOutch)
    const textureFront = (card.Points > 0) ? textureFrontWaouh : textureFrontOutch

    const hoverPosition = [basicPosition[0] - 0.1, basicPosition[1] + 0.1, 0.09];
    const activePosition = [0, 0, 0.5];
    const exitPosition = [4, 0, 0];

    const randomRotation = card.Points > 0 ? Math.PI * 0.02 : Math.PI * -0.02

    const {position, rotationY, rotationZ} = useSpring({
        position: exit ? exitPosition : active && hovered ? activePosition : active ? activePosition : hovered ? hoverPosition : basicPosition,
        rotationY: (exit && hasBeenActive) || active ? Math.PI : 0,
        rotationZ: hovered && !active ? Math.PI / -80 : active ? randomRotation : 0
    });

    useEffect(() => {
        if (exit) {
            const idShow = setTimeout(() => {
                setShow(false)
            }, 2000);
            if (null !== idRef.current) {
                idRef.current = idShow;
            }
        } else {
            if (hasBeenActive) setHasBeenActive(false)
            if (!show) setShow(true)
        }
        return () => {
            clearTimeout(idRef.current)
        };
    }, [exit])

    useEffect(() => {
        if (!hasBeenActive && active) setHasBeenActive(true)
    }, [active])

    return show ? (
        <>
            <a.mesh
                ref={mesh}
                rotation-y={rotationY}
                rotation-z={rotationZ}
                position={position}
            >
                <Box args={[2.25, 4, 0]}>
                    <meshBasicMaterial
                        attachArray="material"
                        map={textureBack}
                        transparent={true}
                    />
                    <meshBasicMaterial
                        attachArray="material"
                        map={textureFront}
                        transparent={true}
                    />
                    <meshBasicMaterial
                        attachArray="material"
                        map={textureBack}
                        transparent={true}
                    />
                    <meshBasicMaterial
                        attachArray="material"
                        map={textureFront}
                        transparent={true}
                    />
                    <meshBasicMaterial
                        attachArray="material"
                        map={textureBack}
                        transparent={true}
                    />
                    <meshBasicMaterial
                        attachArray="material"
                        map={textureFront}
                        transparent={true}
                    />
                </Box>
            </a.mesh>
            <CardContent card={card} position={[0,0,0.5]} rotation={randomRotation} debug={debug}
                         show={showContent && active} isAlternative={false}/>
        </>
    ) : null;
};

export default CardDeckFlippable;
