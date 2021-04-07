import {useEffect, useState} from "react";
import {socket} from "../socketClient";

const useSend = (roomId:string, userKey: number) => {
    const [send, setSend] = useState(false);

    useEffect(() => {
        const sendEvent = (send: boolean) => setSend(send)

        socket.on('send', sendEvent);
        socket.emit('send', roomId, userKey);
        return () => {
            socket.off('send', sendEvent);
        }
    }, []);

    return {send, setSend};
};

export default useSend;
