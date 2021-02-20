import React from 'react';
import {useParams} from "react-router";
import {RouteParams} from "../types/params";
import DidYouKnow from "../components/DidYouKnow";


const Room = () => {
    const {id}: RouteParams = useParams();
    return (
        <div className="Room">
            <h1>Room {id}</h1>
            <DidYouKnow />
        </div>
    );
}

export default Room;
