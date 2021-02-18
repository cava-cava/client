import React from 'react';
import {useParams} from "react-router";
import {RouteParams} from "../types/params";


const Room = () => {
    const {id}: RouteParams = useParams();
    return (
        <div className="Room">
            <h1>Room {id}</h1>
            <div>
                <h2>Le Saviez-vous</h2>
                <p>Etre heureux c bien</p>
            </div>

        </div>
    );
}

export default Room;
