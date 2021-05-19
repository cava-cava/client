import React, {useEffect} from 'react';
import styles from './App.module.scss';
import {MobilePrompt} from "./components/Prompt/MobilePrompt";
import qrCode from './assets/png/qr.png'
import {socket} from "./socketClient";
import {colors} from './mixins/color'
import './mixins/browser-console-color'
import TheRouter from "./components/TheRouter/TheRouter";
import {useDispatch} from "react-redux";
import {SET_ID} from "./store/user/types";
import useDidYouKnow from "./hooks/useDidYouKnow";
import useGameOverMessages from "./hooks/useGameOverMessages";
import QrCodeApp from "./components/App/QrCodeApp";

const App = () => {
    const dispatch = useDispatch();
    useDidYouKnow();
    useGameOverMessages();

    useEffect(() => {
        const connect = () => {
            console.color(`connect ${socket.id}`, colors.green);
            dispatch({type: SET_ID, payload: socket.id})
        }

        const disconnect = () => {
            console.color(`disconnect`, colors.red);
        }

        socket.on("connect", connect);
        socket.on("disconnect", disconnect)

        return () => {
            socket.off('connect', connect);
            socket.off("disconnect", disconnect)
        }
    }, [])

    return (
        <div className={styles.App}>
            <div>
                <section className={styles.AppPhone}>
                    <TheRouter/>
                </section>
            </div>
            <QrCodeApp />
            <MobilePrompt/>
        </div>
    );
}

export default App;
