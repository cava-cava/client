import React, {FunctionComponent} from 'react';
import {socket} from "../../socketClient";
import TheBooty from "./TheBooty";
import useRoundEvent from "../../hooks/useRoundEvent";

type OhMyGodProps = {
    roomId: string,
    userKey: number
}

const OhMyGod: FunctionComponent<OhMyGodProps> = ({roomId, userKey}) => {
    const { win, lose } = useRoundEvent();

    const handleClick = () => {
        socket.emit('winRoundEvent', roomId, userKey)
    }

    return (
        <>
            <h1>OMGGGGGGG !!!!</h1>
            { (!win && !lose) && <button role="button" onClick={handleClick}>Click !!!!!</button> }
            { (win && !lose) && <TheBooty roomId={roomId} userKey={userKey} /> }
            { (lose && !win) && <span>Tu as perdu</span> }
        </>
    )
}

export default OhMyGod;
