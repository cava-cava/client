import React, {useEffect} from 'react';
import styles from './App.module.scss';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from "./pages/Home";
import Tips from "./pages/Tips";
import Setup from "./pages/Setup";
import Rooms from "./pages/Rooms";
import End from "./pages/End";
import {useSelector} from "react-redux";
import {ApplicationState} from "./store";
import PrivateRoute from "./components/PrivateRoute";

import logo from './assets/svg/logo.svg'
import qrCode from './assets/png/qr.png'

const App = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);
    const isAuth: boolean = !!user.name

    useEffect(() => {
        const divInstall = document.getElementById('installContainer');
        const butInstall = document.getElementById('butInstall');

        // @ts-ignore
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            let deferredPrompt = e;
            // Update UI to notify the user they can add to home screen
            // @ts-ignore
            butInstall.style.display = 'block';
            console.log('coucou')

            // @ts-ignore
            butInstall.addEventListener('click', (e) => {
                // hide our user interface that shows our A2HS button
                console.log('click')

                // @ts-ignore
                butInstall.style.display = 'none';
                // Show the prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                // @ts-ignore
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            });
        });


        window.addEventListener('appinstalled', (event:Event) => {
            console.log('👍', 'appinstalled', event);
        });
    }, [])
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
                <Router>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/setup">Setup</Link>
                        <Link to="/rooms">Rooms</Link>
                        <Link to="/end">End</Link>
                        <Link to="/tips">Tips</Link>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <PrivateRoute component={Setup} exact path="/setup" redirectTo="/rooms" condition={!isAuth}/>
                        <PrivateRoute component={Rooms} exact path="/rooms" redirectTo="/setup" condition={isAuth}/>
                        <PrivateRoute component={End} exact path="/end" redirectTo="/setup" condition={isAuth}/>
                        <PrivateRoute component={Tips} exact path="/tips" redirectTo="/setup" condition={isAuth}/>
                        <Route path="*" component={Home}/>
                    </Switch>
                </Router>
            </div>
            <div className={styles.AppCode}>
                <img src={qrCode} alt="QR Code"/>
            </div>
            <div id="installContainer" className="hidden">
                <button id="butInstall" type="button">
                    Install
                </button>
            </div>
        </div>
    );
}

export default App;
