import { IAction } from "./actions";

export const ACTION_PROFILE_SET = "ACTION_PROFILE_SET";
export const ACTION_TEST_PASS = "ACTION_TEST_PASS";
export const ACTION_CHANGE_PASSWORD = "ACTION_CHANGE_PASSWORD";


export function profileSetAction(payload: any): IAction {
    return { type: ACTION_PROFILE_SET, payload };
}

export function profilePassTest(): IAction {
    return { type: ACTION_TEST_PASS};
}

export function profileChangePassword(payload: any): IAction {
    return {type: ACTION_CHANGE_PASSWORD, payload};
}