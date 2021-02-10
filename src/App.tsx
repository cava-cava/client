import React from 'react';
import styles from './App.module.scss';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Tips from "./pages/Tips";
import Setup from "./pages/Setup";
import Rooms from "./pages/Rooms";

const url: string = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : window.location.toString();
const socket = io(url);

// sockets test
socket.on('hello', ( message: string ) => alert(message));

const App = () => {
  return (
    <div className={styles.App}>
        <div className={styles.AppPhone}>
            <Router>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/setup">Setup</Link>
                    <Link to="/rooms">Rooms</Link>
                    <Link to="/tips">Tips</Link>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/setup" component={Setup} />
                    <Route exact path="/rooms" component={Rooms} />
                    <Route exact path="/tips" component={Tips} />
                    <Route path="*" component={Home} />
                </Switch>
            </Router>
        </div>
    </div>
  );
}

export default App;
