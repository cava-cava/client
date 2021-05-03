import React, {FunctionComponent, useEffect, useState} from 'react';
import InputText from "./InputText";
import styles from './FormJoinRoom.module.scss'
import ErrorMessage from "./ErrorMessage";
import useError from "../../hooks/useError";
import {socket} from "../../socketClient";

type FormJoinRoomProps = {
    username: string
    avatar: string
    maxLength?: number
}

const FormJoinRoom: FunctionComponent<FormJoinRoomProps> = ({username, avatar, maxLength=5}) => {
    const error = useError();
    const [room, setRoom] = useState('');
    const [showError, setShowError] = useState(false);
    const [sendEmit, setSendEmit] = useState(false)

    const keypressJoinRoom = () => {
        if(!maxLength || sendEmit) return
        setSendEmit(true);
        if(room.length >= maxLength) {
            socket.emit("joinRoom", username, avatar, room, () => {
                console.log(`JoinRoom`);
                setSendEmit(false);
                if(error.length > 0) setShowError(true)
            });
        } else if(showError) {
            setShowError(false)
        }
    }

    useEffect(() => {
        if(error.length > 0) setShowError(true)
    }, [error])

    return (
        <form autoComplete="off" className={styles.FormJoinRoom} onKeyUp={keypressJoinRoom}>
            <InputText id={"join"} name={"join"} maxLength={maxLength} placeholder="Rejoindre partie" value={room} setValue={setRoom} hasError={showError}/>
            {showError && <ErrorMessage error={error} />}
        </form>
    )
}

export default FormJoinRoom;
