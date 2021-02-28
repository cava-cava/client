import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {RouteParams} from "../types/params";
import DidYouKnow from "../components/DidYouKnow";
import ListUsers from "../components/Users/ListUsers";
import {socket} from "../socketClient";
import {Link} from "react-router-dom";


const Room = () => {
    const {id}: RouteParams = useParams();
    const [users, setUsers] = useState([]);

    socket.on('updateUsers', (users: []) => {
        setUsers(users)
    });

    useEffect(()=> {
        socket.emit('getUsersInRoom', id);
    }, [])

    return (
        <div className="Room">
            <h1>Room {id}</h1>
            <ListUsers users={users}/>
            <DidYouKnow/>
            <Link to="/rooms">Quitter</Link>
        </div>
    );
}

export default Room;
