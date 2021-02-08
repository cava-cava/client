import React from 'react';
import './scss/App.scss';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Tips from "./pages/Tips";
import Names from "./pages/Names";

const url: string = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : window.location.toString();
const socket = io(url);

// sockets test
socket.on('hello', ( message: string ) => alert(message));

const App = () => {
  return (
    <div className="app">
        <div className="app-phone">
            <Router>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/names">Names</Link>
                    <Link to="/tips">Tips</Link>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/names" component={Names} />
                    <Route exact path="/tips" component={Tips} />
                    <Route path="*" component={Home} />
                </Switch>
            </Router>
        </div>
    </div>
  );
}

export default App;
