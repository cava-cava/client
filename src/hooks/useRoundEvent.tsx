import {useEffect, useState} from "react";
import {socket} from "../socketClient";

const useRoundEvent = (roomId:string, userKey: number) => {
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)

    useEffect(() => {

        const winRoundEvent = () => {
            setWin(true)
            setLose(false)
        }

        const loseRoundEvent = () => {
            setWin(false)
            setLose(true)
        }

        socket.on('winRoundEvent', winRoundEvent)
        socket.on('loseRoundEvent', loseRoundEvent)

        socket.emit('checkWinRoundEvent', roomId, userKey)
        return () => {
            socket.off('winRoundEvent', winRoundEvent)
            socket.off('loseRoundEvent', loseRoundEvent)
        }
    })

    return {
        win,
        lose
    };
};

export default useRoundEvent;
