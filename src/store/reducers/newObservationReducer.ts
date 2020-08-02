import { Reducer } from "./reducers";
import { IAction } from "../actions/actions";
import { initialState } from "../store";
import { ACTION_OBSERVATION_UPDATE, ACTION_OBSERVATION_SUBMIT, ACTION_OBSERVATION_SUBMIT_RESPONSE, ACTION_OBSERVATION_CHANGE, ACTION_OBSERVATION_RESET } from "../actions/newObservationActions";

export interface IObservationState {
    submittingObservation: boolean;
    submitMessage: string;
    submittedObservation: boolean;
    page: string;
}

export const observationReducer: Reducer<IObservationState> = (state: IObservationState, action: IAction) => {
    switch (action.type) {
        case ACTION_OBSERVATION_UPDATE: return { ...state, observation: {...state, ...action.payload.observation}};
        case ACTION_OBSERVATION_SUBMIT: return { ...state, submittingObservation: true };
        case ACTION_OBSERVATION_SUBMIT_RESPONSE: return { ...state, submittingObservation: false, submitMessage: action.payload.failure, submittedObservation: !action.payload.failure };
        case ACTION_OBSERVATION_CHANGE: return {...state, page: action.payload};
        case ACTION_OBSERVATION_RESET: return {...state, page: 'species', submittedObservation: false, submitMessage: ''};
    }
    if (state === undefined) { return initialState.newObservation; }
    return state;
};
