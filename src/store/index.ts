import {combineReducers} from "redux";
import {connectRouter, RouterState} from "connected-react-router";

import {History} from "history";

import {userReducer} from "./user/reducer";
import {userState} from "./user/types";
import {tipsState} from "./tips/types";
import {tipsReducer} from "./tips/reducer";

export interface ApplicationState {
    user: userState;
    tips: tipsState;
    router: RouterState;
}

export const createRootReducer = (history: History) =>
    combineReducers({
        user: userReducer,
        tips: tipsReducer,
        router: connectRouter(history)
    });
