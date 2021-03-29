import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {RouteParams} from "../types/params";
import DidYouKnow from "../components/DidYouKnow";
import ListUsers from "../components/Users/ListUsers";
import {socket} from "../socketClient";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {User} from "../store/user/types";
import useRedirect from "../hooks/useRedirect";

const Room = () => {
    const {id}: RouteParams = useParams();
    const [users, setUsers] = useState<User[]>([]);
    const user = useSelector((state: ApplicationState) => state.user.data);

    useRedirect();

    useEffect(() => {
        const updateUsers = (users: []) => {
            setUsers(users)
        }

        socket.on('updateUsers', updateUsers);

        socket.emit('getUsersInRoom', id);
        return () => {
            socket.off('updateUsers', updateUsers);
            setUsers([])
        };
    }, []);

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
            {users.length >= 4 && users.length <= 6 ?
                isHost() ? <div>
                            <button onClick={startGame}>Start game</button>
                           </div>
                    : <div>En attentes de l'hôte...</div>
                : <div>En attentes d'autres joueurs...</div>
            }
            <Link to="/rooms">Quitter</Link>
        </div>
    );
}

export default Room;
