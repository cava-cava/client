import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {SET_NAME} from "../store/user/types";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import styles from "./Rooms.module.scss"
import io from "socket.io-client";

const url: string = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : window.location.toString();

const Rooms = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: ApplicationState) => state.user.data);
    const [name, setName] = useState(user.name);

    const socket = io(url);

    socket.on("connect", () => {
        console.log(`connect ${socket.id}`);
    });

    socket.on("disconnect", () => {
        console.log(`disconnect`);
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const callbackRoom = () => {
        console.log('callback')
    }

    const createRoom = () => {
        socket.emit("createRoom",() => {
            console.log(`createRoom`);
        });
    }

    useEffect(() => {
        dispatch({type: SET_NAME, payload: name});
    }, [name]);

  return (
    <div className={styles.Rooms}>
        <h1>Rooms</h1>
        <input type="text" id="name" name="name" maxLength={12} placeholder="PseudoCool74" value={name} onChange={handleChange} />
        <button onClick={createRoom}>Create</button>
        <input type="text" id="join" name="join" maxLength={5} placeholder="Join" />
    </div>
  );
}

export default Rooms;
