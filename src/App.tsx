import React, {useEffect} from 'react';
import styles from './App.module.scss';
import {MobilePrompt} from "./components/Prompt/MobilePrompt";
import logo from './assets/svg/logo.svg'
import qrCode from './assets/png/qr.png'
import {socket} from "./socketClient";
import SocketLog from "./components/SocketLog";
import {colors} from './mixins/color'
import './mixins/browser-console-color'
import TheRouter from "./components/TheRouter/TheRouter";
import {useDispatch} from "react-redux";
import {SET_ID} from "./store/user/types";
import {FETCH_MESSAGES_ERROR, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, Message} from "./store/messages/types";
import axios from "axios";
import TheDevLinks from "./components/TheRouter/TheDevLinks";

const App = () => {
    const dispatch = useDispatch();

    /**
     * Fetch End Messages
     */
    const fetchMessages = async () => {
        dispatch({type: FETCH_MESSAGES_REQUEST})
        await axios.get('https://happiness-strapi.herokuapp.com/game-overs').then(({data}) => {
            dispatch({
                type: FETCH_MESSAGES_SUCCESS,
                payload: data.sort((a: Message, b: Message) => (a.position > b.position) ? 1 : -1)
            })
        }).catch(function (error) {
            console.error(error)
            dispatch({type: FETCH_MESSAGES_ERROR, payload: error.toString()})
        })
    }

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

        fetchMessages()
        return () => {
            socket.off('connect', connect);
            socket.off("disconnect", disconnect)
        }
    })

    return (
        <div className={styles.App}>
            <div className={styles.AppLogo}>
                <img src={logo} alt="Logo"/>
            </div>
            <div className={styles.AppDescription}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget sem sed enim fringilla tempus in
                    pulvinar diam. Proin varius tellus ac egestas facilisis. Aliquam at diam eget dolor placerat
                    sollicitudin at vitae nisl. Duis pulvinar, ex sagittis porttitor lobortis, odio tortor sollicitudin
                    ante, eu hendrerit ante dolor mollis nibh.
                </p>
            </div>
            <section className={styles.AppPhone}>
                <TheRouter/>
            </section>
            <div className={styles.AppCode}>
                <img src={qrCode} alt="QR Code"/>
            </div>
            <MobilePrompt/>
            <SocketLog />
        </div>
    );
}

export default App;
