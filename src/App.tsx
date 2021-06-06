import React, {useEffect} from 'react';
import styles from './App.module.scss';
import {MobilePrompt} from "./components/Prompt/MobilePrompt";
import bgLeft from './assets/png/appBgLeft.png'
import bgRight from './assets/png/appBgRight.png'
import {socket} from "./socketClient";
import {colors} from './mixins/color'
import './mixins/browser-console-color'
import TheRouter from "./components/TheRouter/TheRouter";
import {useDispatch, useSelector} from "react-redux";
import {SET_ID} from "./store/user/types";
import useDidYouKnow from "./hooks/useDidYouKnow";
import useGameOverMessages from "./hooks/useGameOverMessages";
import QrCodeApp from "./components/App/QrCodeApp";
import useTutorial from "./hooks/useTutorial";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";
import useMusics from "./hooks/useMusics";

const App = () => {
    const dispatch = useDispatch();
    useDidYouKnow();
    useTutorial();
    useGameOverMessages();
    useMusics();

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
                <img src={bgLeft} alt=""/>
                <section className={styles.AppPhone}>
                    <TheRouter/>
                </section>
                <img src={bgRight} alt=""/>
            </div>
            <QrCodeApp />
            <MobilePrompt/>
            <ServiceWorkerWrapper/>
        </div>
    );
}

export default App;
