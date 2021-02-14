import React from 'react';
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

const App = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);
    const isAuth: boolean = !!user.name
    return (
        <div className={styles.App}>
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
                        <PrivateRoute component={Setup} exact path="/setup" redirectTo="/rooms" condition={!isAuth} />
                        <PrivateRoute component={Rooms} exact path="/rooms" redirectTo="/setup" condition={isAuth} />
                        <PrivateRoute component={End} exact path="/end" redirectTo="/setup" condition={isAuth} />
                        <PrivateRoute component={Tips}  exact path="/tips" redirectTo="/setup" condition={isAuth} />
                        <Route path="*" component={Home}/>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
