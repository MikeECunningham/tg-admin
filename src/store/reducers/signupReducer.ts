import { Reducer } from "./reducers";
import { IAction } from "../actions/actions";
import { IAppState, initialState } from "../store";
import { ACTION_SIGNUP_REQUEST, ACTION_SIGNUP_RESPONSE } from "../actions/signUpActions";

export interface ISignupState {
    signingUp: boolean;
    signUpMessage: string;
    signedUp: boolean;
}

export const signUpReducer: Reducer<ISignupState> = (state: ISignupState, action: IAction) => {
    if (state === undefined) { return initialState.signUp; }
    switch (action.type) {
        case ACTION_SIGNUP_REQUEST:
            return { ...state, signUpMessage: "", signingUp: true };
        case ACTION_SIGNUP_RESPONSE:
            return { ...state, signUpMessage: action.payload.failure, signedUp: action.payload.failure ? false : true, signingUp: false };
    }
    return state;
};