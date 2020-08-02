import {combineReducers} from "redux";
import {guideReducer} from "./guideReducer";
import {observationsReducer} from "./observationsReducer";
import {profileReducer} from "./profileReducer";
import {IAction} from "../actions/actions";
import { loginReducer } from "./loginReducer";
import { signUpReducer } from "./signupReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";
import { observationReducer } from "./newObservationReducer";

export type Reducer<T> = (state: T, action: IAction) => T;

export const rootReducer = combineReducers({
    guide: guideReducer,
    observations: observationsReducer,
    newObservation: observationReducer,
    profile: profileReducer,
    login: loginReducer,
    signUp: signUpReducer,
    password: resetPasswordReducer
  });
