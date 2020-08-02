import { IAction } from "./actions";

export const ACTION_LOGIN_REQUEST = "ACTION_LOGIN_REQUEST";
export const ACTION_LOGIN_RESPONSE = "ACTION_LOGIN_RESPONSE";
export const ACTION_LOGIN_CHECK = "ACTION_LOGIN_CHECK";
export const ACTION_LOGOUT_REQUEST = "ACTION_LOGOUT_REQUEST";

/** Updates the store to reflect the app is logging in */
export function loginRequestAction(): IAction {
    return { type: ACTION_LOGIN_REQUEST };
}

/** Updates the store to reflect the app is finished the login request */
export function loginResponseAction(response: { failure?: string, activated: boolean}): IAction {
    return { type: ACTION_LOGIN_RESPONSE, payload: response };
}

/** Updates the store to show the app is logging out */
export function logoutRequestAction(): IAction {
    return { type: ACTION_LOGOUT_REQUEST };
}

/** Checks the internal storage to see if the user is already logged in and redirects them if they are */
export function loginCheckAction(isActivated: boolean): IAction {
    return { type: ACTION_LOGIN_CHECK , payload: {isActivated}};
}
