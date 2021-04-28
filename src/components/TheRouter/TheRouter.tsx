import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import Home from "../../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Setup from "../../pages/Setup";
import Rooms from "../../pages/Rooms";
import Room from "../../pages/Room";
import End from "../../pages/End";
import Tips from "../../pages/Tips";
import Labs from "../../pages/Labs";
import Game from "../../pages/Game";
import TheDevLinks from "./TheDevLinks";

const TheRouter: FunctionComponent = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);
    const isAuth: boolean = !!user.name

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/setup" component={Setup}/>
                <PrivateRoute component={Rooms} exact path="/rooms" redirectTo="/setup" condition={isAuth}/>
                <PrivateRoute component={Room} exact={false} path="/rooms/:id" redirectTo="/setup" condition={isAuth}/>
                <PrivateRoute component={Game} exact={false} path="/game/:id" redirectTo="/setup" condition={isAuth}/>
                <PrivateRoute component={End} exact path="/end" redirectTo="/setup" condition={isAuth}/>
                <PrivateRoute component={Tips} exact path="/tips" redirectTo="/setup" condition={isAuth}/>
                <Route exact path="/labs" component={Labs}/>
                <Route path="*" component={Home}/>
            </Switch>
            <TheDevLinks/>
        </Router>
        )
}

export default TheRouter;
