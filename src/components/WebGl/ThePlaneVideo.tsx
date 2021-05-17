import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {useAspect} from "@react-three/drei";

type ThePlaneVideoProps = {
    videoSrc: string
    loop: boolean
    currentTime?: number
    args: any
    position: any
    triggerPlay: boolean
    onClick: () => void
}

const ThePlaneVideo: FunctionComponent<ThePlaneVideoProps> = ({videoSrc, loop, currentTime= 0, args, position, triggerPlay, onClick}) => {
    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = videoSrc;
        vid.crossOrigin = "Anonymous";
        vid.loop = loop;
        vid.currentTime = currentTime
        return vid;
    });
    const mesh = useRef();

    const play = () => {
        video.play()
    };

    useEffect(()=> {
        if(triggerPlay) play()
    }, [triggerPlay])

    return (
        <mesh ref={mesh} position={position} onClick={onClick}>
            <planeBufferGeometry args={args}/>
            <meshBasicMaterial attach="material">
                <videoTexture attach="map" args={[video]} />
            </meshBasicMaterial>
        </mesh>
    );
}

export default ThePlaneVideo;
