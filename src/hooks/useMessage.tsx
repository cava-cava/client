import {useEffect, useState} from "react";
import {socket} from "../socketClient";

const useMessage = () => {
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('')

    useEffect(() => {
        const messageEvent = (message: string, color?: string) =>{
            setMessage(message)
            if(color) setColor(color)
        }

        socket.on('message', messageEvent);

        return () => {
            socket.off('message', messageEvent);
        }
    }, []);

    return {
        message,
        color
    };
};

export default useMessage;
