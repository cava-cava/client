import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";

import { History } from "history";

import { userReducer } from "./user/reducer";
import { userState } from "./user/types";

export interface ApplicationState {
  user: userState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    user: userReducer,
    router: connectRouter(history)
  });
