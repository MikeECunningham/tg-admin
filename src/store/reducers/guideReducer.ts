import { Reducer } from "./reducers";
import { IAction } from "../actions/actions";
import { IAppState, initialState } from "../store";
import { ACTION_GUIDE_CHANGE } from "../actions/guideActions";

export interface IGuideState {
    currentPage: string;
}

export const guideReducer: Reducer<IGuideState> = (state: IGuideState, action: IAction) => {
    if (action.type === ACTION_GUIDE_CHANGE) {
        return { ...state, currentPage: action.payload };
    } else if (state === undefined) { return initialState.guide; }
    return state;
};
