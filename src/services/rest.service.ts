import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaderResponse, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { loginRequestAction, loginResponseAction, logoutRequestAction, loginCheckAction } from "src/store/actions/loginActions";
import config from "src/config";
import { StoreDataService } from "./store-data.service";
import { Observable } from "rxjs";
import { ILoginState } from "src/store/reducers/loginReducer";
import * as jwt from "@auth0/angular-jwt";
import { signUpRequestAction, signUpResponseAction } from "src/store/actions/signUpActions";
import { resetPasswordRequestAction, resetPasswordResponseAction } from "src/store/actions/resetPasswordActions";
import { observationsRequestAction, observationsResponseAction } from "src/store/actions/observationsActions";
import { observationSubmitAction, observationSubmitResponseAction } from "src/store/actions/newObservationActions";
import { profileSetAction, profileChangePassword } from "src/store/actions/profileActions";
import { encode, decode } from "msgpack-lite";
import * as bufferToArrayBuffer from "buffer-to-arraybuffer";

/**
 * This service handles all of the interactions with the rest interface
 * */
@Injectable()
export class RestService {

    @select() private login: Observable<ILoginState>;
    private loggedIn: boolean;

    constructor(private http: HttpClient, public ngRedux: NgRedux<IAppState>, public storeDataService: StoreDataService) {
        this.login.subscribe((val: ILoginState) => { this.loggedIn = val.loggedIn; });
    }

    /** Basic function used to send the requests to the server */
    private async sendRequest(method: string, endpoint: string, body?: any): Promise<any> {
        body = body || null;
        const token = this.storeDataService.getToken();
        let headers = new HttpHeaders();
        headers = headers.set("Content-Type", `application/msgpack`);
        headers = headers.set("Accept", `application/msgpack`);
        if (token) { headers = headers.set("Authorization", `Bearer ${token}`); }
        const req = new HttpRequest(method, config.baseURL + endpoint, bufferToArrayBuffer(encode(body)), { reportProgress: true, responseType: "arraybuffer", headers });
        if (!navigator.onLine) { return { failure: "No Internet Connection" }; }
        try {
            const event = await this.http.request(req).toPromise();
            if (event instanceof HttpHeaderResponse && event.status === 404) {
                return { failure: "Could not reach server" };
            } else if (event instanceof HttpResponse) {
                return decode(new Uint8Array(event.body as ArrayBuffer));
            } else if (event instanceof HttpErrorResponse) {
                return { failure: event.statusText };
            }
        } catch (err) { return { failure: `${err.status} - ${err.statusText}` } }
    }

    /** Sends a request to get the latest version of the app */
    public async getLatestAppVersion() {
        return await this.sendRequest("POST", "/api/misc/getAppVersion");
    }

    /** Sends a request to modify the users profile remotely */
    public async sendEditProfile(firstName: string, lastName: string, acceptEmails: boolean, postalCode: string) {
        const editResponse = await this.sendRequest("POST", "/api/profile/editProfile", { firstName, lastName, acceptEmails, postalCode });
        if (!editResponse.failure) {
            this.storeDataService.setSession(editResponse.authToken);
        }
    }

    /** Sends a request to mark the user as having passed the test*/
    public async sendTestPass() {
        return await this.sendRequest("POST", "/api/profile/passTest");
    }

    /** Requests that the verification email be resent to the users email address */
    public async sendRequestVerificationEmail() {
        return await this.sendRequest("POST", "/api/auth/resendVerificationEmail");
    }

    /** Sends a login request and updates the redux store accordingly */
    public async sendLogin(email: string, password: string): Promise<void> {
        this.ngRedux.dispatch(loginRequestAction());
        const loginResponse = await this.sendRequest("POST", "/api/auth/emailLogin", { email, password, grantType: "password" });
        let activated = false;
        console.dir(loginResponse);
        if (!loginResponse.failure) {
            const helper = new jwt.JwtHelperService();
            const decodedToken: IPayload = helper.decodeToken(loginResponse.authenticationToken);
            activated = decodedToken.user.activated;
            this.storeDataService.setSession(loginResponse.authenticationToken);
        }
        this.ngRedux.dispatch(loginResponseAction({ failure: loginResponse.failure, activated }));
    }

    /** Sends a login request and updates the redux store accordingly */
    public async sendSignup(email: string, password: string, confirmPassword: string, firstName: string, lastName: string, referenceType: string, acceptEmails: boolean, postalCode: string): Promise<{failure?: string}> {
        this.ngRedux.dispatch(signUpRequestAction());
        if (password !== confirmPassword) {
            this.ngRedux.dispatch(signUpResponseAction({ failure: "Passwords do not match" }));
        } else {
            let activated = false;
            const signUpResponse = await this.sendRequest("POST", "/api/auth/emailSignUp", { email, password, firstName, lastName, referenceType, acceptEmails, postalCode });
            if (!signUpResponse.failure) {
                const helper = new jwt.JwtHelperService();
                const decodedToken: IPayload = helper.decodeToken(signUpResponse.authenticationToken);
                activated = decodedToken.user.activated;
                this.storeDataService.setSession(signUpResponse.authenticationToken);
            }
            this.ngRedux.dispatch(signUpResponseAction(signUpResponse));
            return signUpResponse;
        }
    }

    /** Sends the request to log the user in using their facebook account */
    public async sendFacebookLogin(loginData: any) {
        this.ngRedux.dispatch(loginRequestAction());
        const fbResponse = await this.sendRequest("POST", "/api/auth/facebookLogin", loginData);
        let activated = false;
        if (!fbResponse.failure) {
            const helper = new jwt.JwtHelperService();
            const decodedToken: IPayload = helper.decodeToken(fbResponse.authenticationToken);
            activated = decodedToken.user.activated;
            this.storeDataService.setSession(fbResponse.authenticationToken);
        }

        this.ngRedux.dispatch(loginResponseAction({ failure: fbResponse.failure, activated }));
    }

    /** Sends a password reset request and updates the redux store accordingly */
    public async sendResetPassword(email: string): Promise<void> {
        this.ngRedux.dispatch(resetPasswordRequestAction());
        let doc = await this.sendRequest("POST", "/api/auth/requestPasswordReset", { email });
        if (!!doc) {
            this.ngRedux.dispatch(resetPasswordResponseAction(doc));
        }
    }

    public async sendChangePassword(oldPassword: string, password: string): Promise<{ failure?: string }> {
        let response = await this.sendRequest("POST", "/api/auth/changePassword", { oldPassword, password });
        this.ngRedux.dispatch(profileChangePassword(response));
        return response;
    }

    public async sendDeleteAccount(): Promise<void> {
        const loginResponse = await this.sendRequest("DELETE", "/api/auth/deleteAccount");
        if (loginResponse) {
            this.ngRedux.dispatch(logoutRequestAction());
            this.storeDataService.eraseSession();
        }
    }

    /** Sends a logout request and updates the redux store accordingly */
    public async sendLogout(): Promise<void> {
        this.ngRedux.dispatch(logoutRequestAction());
        this.storeDataService.eraseSession();
        // this.ngRedux.dispatch(logoutResponseAction());
    }

    /** Submits an observation and updates the store accordingly */
    public async submitObservation(observation: IObservation) {
        this.ngRedux.dispatch(observationSubmitAction());
        this.ngRedux.dispatch(observationSubmitResponseAction(await this.sendRequest("POST", "/api/observation/submitObservation", observation)));
    }

    /** Gets all of the observations the current user has submitted */
    public async getObservations() {
        this.ngRedux.dispatch(observationsRequestAction());
        this.ngRedux.dispatch(observationsResponseAction(await this.sendRequest("POST", "/api/observation/getObservations")));
    }

    /** Checks the token in local storage to ensure the user is logged in, and dispatches a logout if the token is expired */
    public checkLoggedIn(): boolean {
        if (this.storeDataService.getToken() === "") { return; }
        const helper = new jwt.JwtHelperService();
        if (helper.isTokenExpired(this.storeDataService.getToken())) {
            this.sendLogout();
        } else {
            this.ngRedux.dispatch(loginCheckAction(this.storeDataService.isActivated()));
            this.ngRedux.dispatch(profileSetAction(this.storeDataService.getSession()));
        }
    }

    /** Sends a turtle guardians card request for the given information */
    public async requestCard(address: string, email: string, name: string): Promise<any> {
        return await this.sendRequest("POST", "/api/misc/requestCard", { address, email, name });
    }
}

interface IPayload {
    user: {
        _id: string;
        email: string;
        authenticationToken: string;
        refreshToken: string;
        firstName: string;
        lastName: string;
        activated: boolean;
        postalCode: string;
    };
}

interface IObservation {
    species: string;
    behavior: string;
    habitat: string;
    lat: number;
    long: number;
    acc: number;
    carapaceImage: Buffer;
    plastronImage?: Buffer;
    previousSubmissions: string;
}
