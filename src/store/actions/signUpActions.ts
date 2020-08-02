import {IAction} from "./actions";

export const ACTION_SIGNUP_REQUEST = "ACTION_SIGNUP_REQUEST";
export const ACTION_SIGNUP_RESPONSE = "ACTION_SIGNUP_RESPONSE";

/** Updates the state to show a signup request was dispatched */
export function signUpRequestAction(): IAction {
    return { type: ACTION_SIGNUP_REQUEST };
}

export function signUpResponseAction(response: {failure?: string}): IAction {
    return { type: ACTION_SIGNUP_RESPONSE, payload: response };
}
