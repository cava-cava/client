import React, {FunctionComponent} from 'react';
import {socket} from "../../socketClient";
import styles from "./StartGame.module.scss"

type StartGameProps = {
    roomId: string
    isHost: boolean
    loading: boolean
    usersLength: number
}

const StartGame: FunctionComponent<StartGameProps> = ({roomId,isHost, loading, usersLength}) => {
    const startGame = () => {
        socket.emit("startGame", roomId, () => {
            console.log(`startGame`);
        });
    }

    return (
        <div className={styles.StartGame}>
            {loading && <div>Chargement...</div>}
            {!loading && usersLength >= 4 && usersLength <= 6 ?
                isHost ? <button onClick={startGame}>C'est parti !</button> : <div>En attente de l'hôte...</div>
            : !loading && <div>En attente des autres joueurs...</div> }
        </div>
    )
}

export default StartGame;
