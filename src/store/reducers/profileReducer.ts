import { Reducer } from "./reducers";
import { IAction } from "../actions/actions";
import { initialState } from "../store";
import { ACTION_PROFILE_SET, ACTION_TEST_PASS, ACTION_CHANGE_PASSWORD } from "../actions/profileActions";

export interface IProfileState {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    editMode: boolean;
    passedTest: boolean;
    authenticated: boolean;
    acceptEmails: boolean;
    changePasswordMessage: string;
    postalCode: string;
}

export const profileReducer: Reducer<IProfileState> = (state: IProfileState, action: IAction) => {
    switch (action.type) {
        case ACTION_PROFILE_SET:
            return { ...state, firstName: action.payload.user.firstName, lastName: action.payload.user.lastName, email: action.payload.user.email, passedTest: action.payload.user.passedTest, activated: action.payload.user.activated, acceptEmails: action.payload.user.acceptEmails, changePasswordMessage: "", postalCode: action.payload.user.postalCode };
        case ACTION_TEST_PASS:
            return { ...state, passedTest: true };
        case ACTION_CHANGE_PASSWORD:
            return {...state, changePasswordMessage: action.payload.failure};
    }
    if (state === undefined) { return initialState.profile; }
    return state;
};