import {combineReducers} from "redux";
import {connectRouter, RouterState} from "connected-react-router";

import {History} from "history";

import {userReducer} from "./user/reducer";
import {userState} from "./user/types";
import {tipsState} from "./tips/types";
import {tipsReducer} from "./tips/reducer";
import {knowsState} from "./knows/types";
import {knowsReducer} from "./knows/reducer";
import {messagesState} from "./messages/types";
import {messagesReducer} from "./messages/reducer";
import {rulesState} from "./rules/types";
import {rulesReducer} from "./rules/reducer";
import {settingsState} from "./settings/types";
import {settingsReducer} from "./settings/reducer";
import {tutorialState} from "./tutorial/types";
import {tutorialReducer} from "./tutorial/reducer";

export interface ApplicationState {
    settings: settingsState
    user: userState;
    knows: knowsState;
    tutorial: tutorialState;
    messages: messagesState;
    tips: tipsState;
    rules: rulesState;
    router: RouterState;
}

export const createRootReducer = (history: History) =>
    combineReducers({
        settings: settingsReducer,
        user: userReducer,
        knows: knowsReducer,
        tutorial: tutorialReducer,
        messages: messagesReducer,
        tips: tipsReducer,
        rules: rulesReducer,
        router: connectRouter(history)
    });
