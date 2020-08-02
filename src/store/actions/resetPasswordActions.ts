import {IAction} from "./actions";

export const ACTION_RESETPASSWORD_REQUEST = "ACTION_RESETPASSWORD_REQUEST";
export const ACTION_RESETPASSWORD_RESPONSE = "ACTION_RESETPASSWORD_RESPONSE";

/** Updates the state to show a password request was dispatched */
export function resetPasswordRequestAction(): IAction {
    return { type: ACTION_RESETPASSWORD_REQUEST };
}

export function resetPasswordResponseAction(response: {failure?: string}): IAction {
    return { type: ACTION_RESETPASSWORD_RESPONSE, payload: response };
}
