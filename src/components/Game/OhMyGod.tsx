import React, {FunctionComponent} from 'react';
import {socket} from "../../socketClient";

type OhMyGodProps = {
    id: string
}

const OhMyGod: FunctionComponent<OhMyGodProps> = ({id}) => {
    const handleClick = () => {
        console.log('send/emit socket action')
        socket.emit('endOMG', id)
    }
    return (
        <>
            <h1>OMGGGGGGG !!!!!!!!</h1>
            <button role="button" onClick={handleClick}>Click !!!!!</button>
        </>
    )
}

export default OhMyGod;
