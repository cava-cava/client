import React from "react";
import {RouteParams} from "../types/params";
import {useParams} from "react-router";
import useRedirect from "../hooks/useRedirect";
import TheGame from "../components/Game/TheGame";
import SocketLog from "../components/SocketLog";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";

const Game = () => {
    const {id}: RouteParams = useParams();
    const userKey = useSelector((state: ApplicationState) => state.user.data.key);

    useRedirect();

    return (
        <>
            <TheGame roomId={id}/>
            <SocketLog roomId={id} userKey={userKey}/>
        </>
    );
};

export default Game;
