import React, {FunctionComponent} from 'react';
import {Redirect} from "react-router";
import {Route} from "react-router-dom";

type PrivateRouteProps = {
    condition: boolean,
    exact?: boolean,
    path: string,
    redirectTo: string,
    component: any
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({condition, exact = true, component: Component, path, redirectTo}) => {
    return (
        <Route exact={exact} path={path} render={(props) => (
            condition
                ? <Component {...props} />
                : <Redirect to={redirectTo} />
        )}/>)
}

export default PrivateRoute;
