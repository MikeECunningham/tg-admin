import { Reducer } from "./reducers";
import { IAction } from "../actions/actions";
import { initialState } from "../store";
import { ACTION_OBSERVATIONS_REQUEST, ACTION_OBSERVATIONS_RESPONSE } from "../actions/observationsActions";

export interface IObservationsState {
    gettingObservations: boolean;
    requestMessage: string;
    observations: any[];
}

export const observationsReducer: Reducer<IObservationsState> = (state: IObservationsState, action: IAction) => {
    switch (action.type) {
        case ACTION_OBSERVATIONS_REQUEST: return { ...state, gettingObservations: true};
        case ACTION_OBSERVATIONS_RESPONSE: return { ...state, gettingObservations: false, observations: action.payload.observations, requestMessage: action.payload.failure};
    }
    if (state === undefined) { return initialState.observations; }
    return state;
};
