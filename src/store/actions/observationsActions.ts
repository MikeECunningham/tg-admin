import {IAction} from "./actions";

export const ACTION_OBSERVATIONS_REQUEST = "ACTION_OBSERVATIONS_REQUEST";
export const ACTION_OBSERVATIONS_RESPONSE = "ACTION_OBSERVATIONS_RESPONSE";

export function observationsRequestAction(): IAction {
    return { type: ACTION_OBSERVATIONS_REQUEST };
}

export function observationsResponseAction(response: any): IAction {
    return { type: ACTION_OBSERVATIONS_RESPONSE, payload:  response};
}
