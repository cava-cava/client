import React, {FunctionComponent, useState} from 'react';
import {socket} from "../../socketClient";
import TheBooty from "./TheBooty";

type OhMyGodProps = {
    id: string
}

const OhMyGod: FunctionComponent<OhMyGodProps> = ({id}) => {
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const handleClick = () => {
        console.log(id)
        socket.emit('winOMG', id)
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
            { (win && !lose) && <TheBooty/> }
            { (lose && !win) && <span>Tu as perdu</span> }
        </>
    )
}

export default OhMyGod;
