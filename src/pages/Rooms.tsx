import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";
import styles from "./Rooms.module.scss"
import {socket} from "../socketClient";
import useError from "../hooks/useError";
import useRedirect from "../hooks/useRedirect";
import useLeaveRoom from "../hooks/useLeaveRoom";
import AvatarHeader from "../components/Avatar/AvatarHeader";
import FormUsername from "../components/Form/FormUsername";
import { Link } from 'react-router-dom';

const Rooms = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);
    const [room, setRoom] = useState('');
    const error = useError();

    useRedirect();
    useLeaveRoom();

    const handleChangeRoom = (event: ChangeEvent<HTMLInputElement>) => {
        setRoom(event.target.value);
    }

    const createRoom = () => {
        socket.emit("createRoom", user.name, () => {
            console.log(`createRoom`);
        });
    }

    const joinRoom = (event: FormEvent) => {
        event.preventDefault()
        socket.emit("joinRoom", user.name, room, () => {
            console.log(`JoinRoom`);
        });
    }

    return (
        <div className={styles.Rooms}>
            <div>
                <Link to={"/setup"}>
                    <AvatarHeader color={"noir"} avatarNumber={user.avatar} />
                </Link>
                <FormUsername name={user.name} showSubmit={false}/>
                <button onClick={createRoom}>Create</button>
                <form autoComplete="off" onSubmit={joinRoom}>
                    <input type="text" id="join" name="join" maxLength={5} placeholder="Join" value={room}
                           onChange={handleChangeRoom}/>
                    <input type="submit" value="Join"/>
                </form>
                { error && <div>ERROR: {error}</div>}
            </div>
        </div>
    );
}

export default Rooms;
