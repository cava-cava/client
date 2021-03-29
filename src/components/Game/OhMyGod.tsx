import React, {FunctionComponent, useState} from 'react';
import {socket} from "../../socketClient";
import TheBooty from "./TheBooty";

type OhMyGodProps = {
    roomId: string,
    userId: number
}

const OhMyGod: FunctionComponent<OhMyGodProps> = ({roomId, userId}) => {
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const handleClick = () => {
        socket.emit('winOMG', roomId)
    }
    const callback = () => {
        socket.emit('endOMG', roomId)
    }

    socket.on('winOMG', () => {
        setWin(true)
    })
    socket.on('loseOMG', () => {
        setWin(false)
        setLose(true)
    })
    return (
        <>
            <h1>OMGGGGGGG !!!!</h1>
            { (!win && !lose) && <button role="button" onClick={handleClick}>Click !!!!!</button> }
            { (win && !lose) && <TheBooty roomId={roomId} userId={userId} callback={callback}/> }
            { (lose && !win) && <span>Tu as perdu</span> }
        </>
    )
}

export default OhMyGod;
