import {useEffect, useState} from "react";
import {socket} from "../socketClient";

const useTimer = () => {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const timer = (seconds: number) => {
            setSeconds(seconds)
        }

        socket.on("timer", timer)

        return () => {
            socket.off("timer", timer)
        }
    }, []);

    return seconds;
};

export default useTimer;
