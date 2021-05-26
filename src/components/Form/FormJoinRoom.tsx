import React, {FormEvent, FunctionComponent, useEffect, useState} from 'react';
import InputText from "./InputText";
import styles from './FormJoinRoom.module.scss'
import ErrorMessage from "./ErrorMessage";
import useMessage from "../../hooks/useMessage";
import {socket} from "../../socketClient";

type FormJoinRoomProps = {
    username: string
    avatar: string
    maxLength?: number
}

const FormJoinRoom: FunctionComponent<FormJoinRoomProps> = ({username, avatar, maxLength=5}) => {
    const {message: error, color} = useMessage();
    const [room, setRoom] = useState('');
    const [showError, setShowError] = useState(false);
    const [sendEmit, setSendEmit] = useState(false)

    const keypressJoinRoom = () => {
        if(!maxLength || sendEmit) return
        if(room.length >= maxLength) {
            setSendEmit(true);
            socket.emit("joinRoom", username, avatar, room, () => {
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

    useEffect(() => {
        return () => {
            setRoom('')
            setShowError(false)
            setSendEmit(false)
        }
    },[])

    return (
        <form autoComplete="off" className={styles.FormJoinRoom} onKeyUp={keypressJoinRoom} onSubmit={(event: FormEvent) => event.preventDefault()}>
            <InputText id={"join"} name={"join"} maxLength={maxLength} placeholder="Rejoindre partie" value={room} setValue={setRoom} hasError={showError}/>
            {showError && <ErrorMessage error={error} />}
        </form>
    )
}

export default FormJoinRoom;
