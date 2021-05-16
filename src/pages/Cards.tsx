import React, {useRef} from 'react';
import TheCanvas from "../components/WebGl/TheCanvas";

function Background({...props}) {
    const mesh = useRef()

    return (
        <mesh
            {...props}
            ref={mesh}
        >
            <planeBufferGeometry args={[4, 5]}/>
            <meshStandardMaterial color={'hotpink'}/>
        </mesh>
    )
}

const Cards = () => {
    return (
        <TheCanvas>
            <Background position={[0, 0, 0]}/>
        </TheCanvas>
    );
}

export default Cards;
