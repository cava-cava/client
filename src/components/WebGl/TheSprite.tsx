import React, {FunctionComponent, useEffect, useRef} from 'react';
import * as THREE from "three";
import {useLoader} from "@react-three/fiber";
import {PlainSingularAnimator} from "three-plain-animator/lib/plain-singular-animator";

type SpiteProps = {
    textureSrc: string
    args: any
    position: any
    triggerAnimate: boolean
    onClick: () => void
}

const TheSprite: FunctionComponent<SpiteProps> = ({textureSrc, args, position, triggerAnimate, onClick}) => {
    const spriteTexture: any = useLoader(THREE.TextureLoader, textureSrc);
    const animator = new PlainSingularAnimator(spriteTexture, 4, 4, 10, 10);
    const texture: any = animator.init();

    const mesh = useRef();

    const animate = () => {
        animator.init()
        animator.play();
    };

    useEffect(()=> {
        if(triggerAnimate) animate()
    }, [triggerAnimate])

    return (
        <mesh ref={mesh} position={position} onClick={onClick}>
            <planeBufferGeometry args={args}/>
            <meshBasicMaterial
                attach="material"
                map={texture}
                transparent={true}
            />
        </mesh>
    );
}

export default TheSprite;
