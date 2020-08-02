import { Reducer } from "./reducers";
import { IAction } from "../actions/actions";
import { IAppState, initialState } from "../store";
import { ACTION_LOGIN_REQUEST, ACTION_LOGIN_RESPONSE, ACTION_LOGIN_CHECK, ACTION_LOGOUT_REQUEST } from "../actions/loginActions";
import * as jwt from "@auth0/angular-jwt";
import { AppModule } from "src/modules/app.module";

export interface ILoginState {
    loggingIn: boolean;
    loginMessage: string;
    loggedIn: boolean;
    isActivated: boolean;
}

export const loginReducer: Reducer<ILoginState> = (state: ILoginState, action: IAction) => {
    if (state === undefined) { return initialState.login; }
    switch (action.type) {
        case ACTION_LOGIN_REQUEST:
            return { ...state, loggingIn: true, loginMessage: ""};
        case ACTION_LOGIN_RESPONSE:
            return { ...state, loggingIn: false, loggedIn: action.payload.failure ? false : true, loginMessage: action.payload.failure, isActivated: action.payload.activated };
        case ACTION_LOGOUT_REQUEST:
            return { ...state, loggedIn: false, loginMessage: "", isActivated: false};
        case ACTION_LOGIN_CHECK:
            return { ...state, loggingIn: false, loggedIn: true, loginMessage: "", isActivated: action.payload.isActivated };
    }
    return state;
};