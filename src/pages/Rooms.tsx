import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {SET_NAME} from "../store/user/types";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import styles from "./Rooms.module.scss"
import {socket} from "../socketClient";
import useError from "../hooks/useError";
import useRedirect from "../hooks/useRedirect";
import useLeaveRoom from "../hooks/useLeaveRoom";

const Rooms = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const [name, setName] = useState(user.name);
    const [room, setRoom] = useState('');
    const error = useError();

    useRedirect();
    useLeaveRoom();

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleChangeRoom = (event: ChangeEvent<HTMLInputElement>) => {
        setRoom(event.target.value);
    }

    const createRoom = () => {
        socket.emit("createRoom", name, () => {
            console.log(`createRoom`);
        });
    }

    const joinRoom = (event: FormEvent) => {
        event.preventDefault()
        socket.emit("joinRoom", name, room, () => {
            console.log(`JoinRoom`);
        });
    }

    //Update username
    useEffect(() => {
        dispatch({type: SET_NAME, payload: name});
    }, [name]);

    return (
        <div className={styles.Rooms}>
            <h1>Rooms</h1>
            <input type="text" id="name" name="name" maxLength={12} placeholder="PseudoCool74" value={name}
                   onChange={handleChangeName}/>
            <button onClick={createRoom}>Create</button>
            <form autoComplete="off" onSubmit={joinRoom}>
                <input type="text" id="join" name="join" maxLength={5} placeholder="Join" value={room}
                       onChange={handleChangeRoom}/>
                <input type="submit" value="Join"/>
            </form>
            { error && <div>ERROR: {error}</div>}
        </div>
    );
}

export default Rooms;
