import React, {FunctionComponent} from 'react';
import {Redirect} from "react-router";
import {Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../store";

type PrivateRouteProps = {
    exact?: boolean,
    path: string,
    component: any
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({exact = true, component: Component, path}) => {
    const user = useSelector((state: ApplicationState) => state.user.data);
    const isAuth: boolean = !!user.name
    return (
        <Route exact={exact} path={path} render={(props) => (
            isAuth
                ? <Component {...props} />
                : <Redirect to='/setup'/>
        )}/>)
}

export default PrivateRoute;
