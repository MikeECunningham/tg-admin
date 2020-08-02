import { IObservationsState } from "./reducers/observationsReducer";
import { IProfileState } from "./reducers/profileReducer";
import { IGuideState } from "./reducers/guideReducer";
import { ILoginState } from "./reducers/loginReducer";
import { ISignupState } from "./reducers/signupReducer";
import { IResetPasswordState } from "./reducers/resetPasswordReducer";
import { IObservationState } from "./reducers/newObservationReducer";

export interface IAppState {
    guide: IGuideState;
    observations: IObservationsState;
    newObservation: IObservationState;
    profile: IProfileState;
    login: ILoginState;
    signUp: ISignupState;
    password: IResetPasswordState;
}
export let initialState: IAppState = {
    guide: {
        currentPage: "main"
    },
    observations: {
        gettingObservations: false,
        observations: [],
        requestMessage: "",
    },
    newObservation: {
        submittedObservation: false,
        page: "species",
        submittingObservation: false,
        submitMessage: ""
    },
    profile: {
        _id: "",
        firstName: "",
        lastName: "",
        profilePicture: "",
        editMode: false,
        passedTest: false,
        authenticated: false,
        email: "",
        acceptEmails: false,
        changePasswordMessage: "",
        postalCode: ""
    },
    login: {
        loggingIn: false,
        loginMessage: "",
        loggedIn: false,
        isActivated: false
    },
    signUp: {
        signingUp: false,
        signUpMessage: "",
        signedUp: false
    },
    password: {
        resetingPassword: false,
        resetMessage: "",
        passwordReset: false
    }
};
