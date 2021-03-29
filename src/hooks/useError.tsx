import {useEffect, useState} from "react";
import {socket} from "../socketClient";

const useModal = () => {
    const [error, setError] = useState('');

    useEffect(() => {
        const errorEvent = (error: string) => setError(error)

        socket.on('error', errorEvent);

        return () => {
            socket.off('error', errorEvent);
        }
    }, []);

    return error;
};

export default useModal;
