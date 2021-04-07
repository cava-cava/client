import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {RouteParams} from "../types/params";
import DidYouKnow from "../components/DidYouKnow";
import ListUsers from "../components/Users/ListUsers";
import {socket} from "../socketClient";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import useRedirect from "../hooks/useRedirect";
import useListUsers from "../hooks/useListUsers";

const Room = () => {
    const {id}: RouteParams = useParams();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const users = useListUsers(id);
    const [loading, setLoading] = useState<boolean>(false)

    useRedirect();

    useEffect(() => {
        const loadingEmit = (loading: boolean) => {
            setLoading(loading)
        }

        socket.on('loading', loadingEmit);
        return () => {
            socket.off('loading', loadingEmit);
            setLoading(false);
        };
    }, [])

    const isHost = () => {
        return users.length > 0 && users[0].id === user.id
    }

    const startGame = () => {
        socket.emit("startGame", id, () => {
            console.log(`startGame`);
        });
    }

    return (
        <div className="Room">
            <h1>Room {id}</h1>
            <ListUsers users={users}/>
            <DidYouKnow/>
            {loading && <div>Loading...</div>}
            {!loading && users.length >= 4 && users.length <= 6 ?
                isHost() ? <div>
                            <button onClick={startGame}>Start game</button>
                           </div>
                    : <div>En attentes de l'hôte...</div>
                : !loading && <div>En attentes d'autres joueurs...</div>
            }
            {!loading && <Link to="/rooms">Quitter</Link>}
        </div>
    );
}

export default Room;
