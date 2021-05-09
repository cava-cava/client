import React, {useEffect, useState} from "react";
import {RouteParams} from "../types/params";
import {useParams} from "react-router";
import {socket} from "../socketClient";
import useRedirect from "../hooks/useRedirect";
import TheGame from "../components/Game/TheGame";
import SocketLog from "../components/SocketLog";
import DisconnectedUsers from "../components/Users/DisconnectedUsers";

const Game = () => {
    const {id}: RouteParams = useParams();
    const [isUsersDisconnected, setIsUsersDisconnected] = useState<boolean>(
        false
    );

    useRedirect();

    useEffect(() => {
        const userDisconnected = (isDisconnected: boolean) => {
            setIsUsersDisconnected(isDisconnected);
        };

        socket.on("userDisconnected", userDisconnected);

        socket.emit("userDisconnected", id);
        return () => {
            socket.off("userDisconnected", userDisconnected);
            setIsUsersDisconnected(false);
        };
    }, []);

    return (
        <>
            <>
                {isUsersDisconnected ? (
                    <DisconnectedUsers roomId={id}/>
                ) : (
                    <TheGame roomId={id}/>
                )}
            </>
            <SocketLog roomId={id}/>
        </>
    );
};

export default Game;
