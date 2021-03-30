import React, {FunctionComponent, useEffect, useState} from 'react';
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
        socket.emit('endRoundEvent', roomId)
    }

    useEffect(() => {
        const winOMG = () => {
            setWin(true)
        }

        const loseOMG = () => {
            setWin(false)
            setLose(true)
        }

        socket.on('winOMG', winOMG)
        socket.on('loseOMG', loseOMG)

        return () => {
            socket.off('winOMG', winOMG)
            socket.off('loseOMG', loseOMG)
        }
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
