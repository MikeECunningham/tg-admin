import { IAction } from "./actions";

export const ACTION_OBSERVATION_UPDATE = "ACTION_OBSERVATION_UPDATE";
export const ACTION_OBSERVATION_RESET = "ACTION_OBSERVATION_RESET";
export const ACTION_OBSERVATION_SUBMIT = "ACTION_OBSERVATION_SUBMIT";
export const ACTION_OBSERVATION_SUBMIT_RESPONSE = "ACTION_OBSERVATION_SUBMIT_RESPONSE";
export const ACTION_OBSERVATION_CHANGE = "ACTION_OBSERVATION_CHANGE";

export function observationSubmitAction(): IAction {
    return { type: ACTION_OBSERVATION_SUBMIT};
}

export function observationSubmitResponseAction(response: any): IAction {
    return { type: ACTION_OBSERVATION_SUBMIT_RESPONSE, payload: response };
}

export function observationUpdateAction(observation: any): IAction {
    return { type: ACTION_OBSERVATION_SUBMIT, payload: { observation } };
}

export function observationResetAction(): IAction {
    return { type: ACTION_OBSERVATION_RESET };
}

export function observationChangeAction(page: string): IAction {
    return { type: ACTION_OBSERVATION_CHANGE, payload: page };
}
