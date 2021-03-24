import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router";
import {RouteParams} from "../types/params";
import DidYouKnow from "../components/DidYouKnow";
import ListUsers from "../components/Users/ListUsers";
import {socket} from "../socketClient";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {User} from "../store/user/types";


const Room = () => {
    const {id}: RouteParams = useParams();
    const [users, setUsers] = useState<User[]>([]);
    const history = useHistory();
    const user = useSelector((state: ApplicationState) => state.user.data);

    const isHost = () => {
        return users.length > 0 && users[0].id === user.id
    }

    socket.on('redirect', (path: string) => history.push(path));

    socket.on('updateUsers', (users: []) => {
        setUsers(users)
    });

    useEffect(() => {
        socket.emit('getUsersInRoom', id);
    }, [])

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
