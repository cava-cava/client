import React, {FunctionComponent} from 'react';
import styles from './CreateRoom.module.scss'
import {socket} from "../../socketClient";

type CreateRoomProps = {
    username: string
    avatar: string
}

const CreateRoom: FunctionComponent<CreateRoomProps> = ({username, avatar}) => {
    const createRoom = () => {
        socket.emit("createRoom", username, avatar, () => {
            console.log(`createRoom`);
        });
    }

    return (<button className={styles.CreateRoom} onClick={createRoom}>Créer partie</button>)
}

export default CreateRoom;
