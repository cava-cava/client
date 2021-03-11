import React from 'react';
import styles from './App.module.scss';
import {MobilePrompt} from "./components/Prompt/MobilePrompt";

import logo from './assets/svg/logo.svg'
import qrCode from './assets/png/qr.png'
import {socket} from "./socketClient";
import SocketLog from "./components/SocketLog";
import {colors} from './mixins/color'
import './mixins/browser-console-color'
import TheRouter from "./components/TheRouter/TheRouter";

const App = () => {
    socket.on("connect", () => {
        console.color(`connect ${socket.id}`, colors.green);
    });

    socket.on("disconnect", () => {
        console.color(`disconnect`, colors.red);
    });


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
            <div className={styles.AppPhone}>
                <TheRouter/>
            </div>
            <div className={styles.AppCode}>
                <img src={qrCode} alt="QR Code"/>
            </div>
            <MobilePrompt/>
            {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && <SocketLog />}
        </div>
    );
}

export default App;
