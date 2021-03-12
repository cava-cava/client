import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
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
import Julien from "../../pages/Julien";

const TheRouter: FunctionComponent = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);
    const isAuth: boolean = !!user.name

    return (
        <Router>
            <nav>
                <Link to="/rooms">Rooms</Link>
                <Link to="/end">End</Link>
                <Link to="/tips">Tips</Link>
                <Link to="/labs">Labs</Link>
                <Link to="/julien">Julien</Link>
            </nav>
            <Switch>
                <Route exact path="/" component={Home}/>
                <PrivateRoute component={Setup} exact path="/setup" redirectTo="/rooms" condition={!isAuth}/>
                <PrivateRoute component={Rooms} exact path="/rooms" redirectTo="/setup" condition={isAuth}/>
                <PrivateRoute component={Room} exact={false} path="/rooms/:id" redirectTo="/setup" condition={isAuth}/>
                <PrivateRoute component={End} exact path="/end" redirectTo="/setup" condition={isAuth}/>
                <PrivateRoute component={Tips} exact path="/tips" redirectTo="/setup" condition={isAuth}/>
                <Route exact path="/labs" component={Labs}/>
                <Route exact path="/julien" component={Julien}/>
                <Route path="*" component={Home}/>
            </Switch>
        </Router>
        )
}

export default TheRouter;
