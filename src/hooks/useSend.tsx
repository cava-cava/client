import {useEffect, useState} from "react";
import {socket} from "../socketClient";

const useSend = (userKey: number) => {
    const [send, setSend] = useState(false);

    useEffect(() => {
        const sendEvent = (send: boolean) => setSend(send)

        socket.on('send', sendEvent);
        return () => {
            socket.off('send', sendEvent);
        }
    }, []);

    return {send, setSend};
};

export default useSend;
