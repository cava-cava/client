import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import Home from "../../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Setup from "../../pages/Setup";
import Rooms from "../../pages/Rooms";
import Room from "../../pages/Room";
import End from "../../pages/End";
import Tips from "../../pages/Tips";
import Game from "../../pages/Game";
import TheDevLinks from "./TheDevLinks";
import Cards from "../../pages/Cards";
import Test from "../../pages/Test";
import Omg from "../../pages/Omg";

const TheRouter: FunctionComponent = () => {
    const user = useSelector((state: ApplicationState) => state.user.data);
    const isAuth: boolean = !!user.name

    return (
        <Router>
            <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames="page"
                        timeout={600}
                    >
                        <Switch location={location}>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/setup" component={Setup}/>
                            <PrivateRoute component={Rooms} exact path="/rooms" redirectTo="/setup" condition={isAuth}/>
                            <PrivateRoute component={Room} exact={false} path="/rooms/:id" redirectTo="/setup"
                                          condition={isAuth}/>
                            <PrivateRoute component={Game} exact={false} path="/game/:id" redirectTo="/setup"
                                          condition={isAuth}/>
                            <PrivateRoute component={End} exact path="/end" redirectTo="/setup" condition={isAuth}/>
                            <PrivateRoute component={Tips} exact path="/tips" redirectTo="/setup" condition={isAuth}/>
                            <Route exact path="/debug/omg" component={Omg}/>
                            <Route exact path="/debug/cards" component={Cards}/>
                            <Route exact path="/debug/test" component={Test}/>
                            <Route path="*" component={Home}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}/>
            <TheDevLinks/>
        </Router>
    )
}

export default TheRouter;
