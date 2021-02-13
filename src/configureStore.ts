import {applyMiddleware, createStore, Store} from "redux";

import thunk from "redux-thunk";

import {routerMiddleware} from "connected-react-router";

import {History} from "history";

import {ApplicationState, createRootReducer} from "./store";

export default function configureStore(
    history: History,
    initialState: ApplicationState
): Store<ApplicationState> {
    return createStore(
        createRootReducer(history),
        initialState,
        applyMiddleware(routerMiddleware(history), thunk)
    );
}
