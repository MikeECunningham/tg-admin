import { Reducer } from "./reducers";
import { IAction } from "../actions/actions";
import { IAppState, initialState } from "../store";
import * as jwt from "@auth0/angular-jwt";
import { ACTION_RESETPASSWORD_REQUEST, ACTION_RESETPASSWORD_RESPONSE } from "../actions/resetPasswordActions";

export interface IResetPasswordState {
    resetingPassword: boolean;
    resetMessage: string;
    passwordReset: boolean;
}

export const resetPasswordReducer: Reducer<IResetPasswordState> = (state: IResetPasswordState, action: IAction) => {
    if (state === undefined) { return initialState.password; }
    switch (action.type) {
        case ACTION_RESETPASSWORD_REQUEST:
            return { ...state, loggingIn: true, loginMessage: ""};
        case ACTION_RESETPASSWORD_RESPONSE:
            return { ...state, resetingPassword: false, resetMessage: action.payload.failure, passwordReset: action.payload.failure ? false : true};
    }
    return state;
};

interface IPayload {
    user: {
        _id: string;
        email: string;
        authenticationToken: string;
        refreshToken: string;
        firstName: string;
        lastName: string;
        activated: boolean;
    };
}
