import React, {useEffect} from 'react';
import styles from './Game.module.scss'
import {RouteParams} from "../types/params";
import {useParams} from "react-router";
import {socket} from "../socketClient";
import useRedirect from "../hooks/useRedirect";
import TheModal from "../components/Modal/TheModal";
import useModal from "../hooks/useModal";
import TheGame from "../components/Game/TheGame";

const Game = () => {
    const {id}: RouteParams = useParams();
    const { isShowing: isUsersDisconnected, toggle: toggleUsersDisconnected } = useModal();

    useRedirect();

    useEffect(() => {
        const userDisconnected = (isDisconnected: boolean) => {
            toggleUsersDisconnected(isDisconnected)
        }

        socket.on('userDisconnected', userDisconnected);

        socket.emit('userDisconnected', id)
        return () => {
            socket.on('userDisconnected', userDisconnected);
        };
    }, [])

    return (
        <div className={styles.Game}>
            {!isUsersDisconnected && <TheGame roomId={id}/>}
            <TheModal
                isShowing={isUsersDisconnected}
                hide={toggleUsersDisconnected}
                title="Quelqu’un est déconnecté"
                close={false}
            >
                Veuillez patienter
            </TheModal>
        </div>
    );
}

export default Game;
