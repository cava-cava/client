import {combineReducers} from "redux";
import {connectRouter, RouterState} from "connected-react-router";

import {History} from "history";

import {userReducer} from "./user/reducer";
import {userState} from "./user/types";
import {tipsState} from "./tips/types";
import {tipsReducer} from "./tips/reducer";
import {knowsState} from "./knows/types";
import {knowsReducer} from "./knows/reducer";

export interface ApplicationState {
    user: userState;
    knows: knowsState;
    tips: tipsState;
    router: RouterState;
}

export const createRootReducer = (history: History) =>
    combineReducers({
        user: userReducer,
        knows: knowsReducer,
        tips: tipsReducer,
        router: connectRouter(history)
    });
