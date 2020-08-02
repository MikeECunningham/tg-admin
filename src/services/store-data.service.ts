import { Inject, Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import config from "../config";
import * as jwt from "@auth0/angular-jwt";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "src/store/store";
import { profileSetAction } from "src/store/actions/profileActions";

@Injectable()
export class StoreDataService {

    constructor(private storage: LocalStorageService, public ngRedux: NgRedux<IAppState>) { }

    public setLatestVersion(version: number) {
        localStorage.setItem("latestVersion", version.toString());
    }

    public getLatestVersion() {
        return localStorage.getItem("latestVersion") !== undefined ? Number.parseInt(localStorage.getItem("latestVersion"), 10) : config.version;
    }

    /** Checks if the app version is up to date with the newest version of the application */
    public isOutdated(): boolean {
        return this.getLatestVersion() > config.version;
    }

    public isActivated(): boolean {
        return localStorage.getItem("activated") === "true";
    }

    public getToken(): string | null {
        return localStorage.getItem("token") !== undefined ? localStorage.getItem("token") : "";
    }

    public setTestPassed() {
        return localStorage.setItem("passedTest", "true");
    }

    public getSession(): any {
        return {
            user: {
                userID: localStorage.getItem("userID"),
                token: localStorage.getItem("token"),
                firstName: localStorage.getItem("firstName"),
                email: localStorage.getItem("email"),
                lastName: localStorage.getItem("lastName"),
                activated: localStorage.getItem("activated") == "true" ? true : false,
                passedTest: localStorage.getItem("passedTest") == "true" ? true : false,
                acceptEmails: localStorage.getItem("acceptEmails") == "true" ? true : false,
                postalCode: localStorage.getItem("postalCode")
            }
        };
    }

    /** Gets the users prefered language */
    public getLanguage(): string {
        return localStorage.getItem("language");
    }

    /** Sets the users prefered language */
    public setLanguage(language: string) {
        localStorage.setItem("language", language);
    }

    /** Sets the session data using the given jwt */
    public setSession(authenticationToken: string) {
        const helper = new jwt.JwtHelperService();
        const decodedToken: IPayload = helper.decodeToken(authenticationToken);
        localStorage.setItem("userID", decodedToken.user._id);
        localStorage.setItem("token", authenticationToken);
        localStorage.setItem("firstName", decodedToken.user.firstName);
        localStorage.setItem("email", decodedToken.user.email);
        localStorage.setItem("lastName", decodedToken.user.lastName);
        localStorage.setItem("activated", decodedToken.user.activated ? "true" : "false");
        localStorage.setItem("passedTest", decodedToken.user.passedTest ? "true" : "false");
        localStorage.setItem("acceptEmails", decodedToken.user.acceptEmails ? "true" : "false");
        localStorage.setItem("postalCode", decodedToken.user.postalCode);
        this.ngRedux.dispatch(profileSetAction(decodedToken));
    }

    /** Removes the session data from the local store to log the user out properly */
    public eraseSession(): void {
        localStorage.removeItem("userID");
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("activated");
        localStorage.removeItem("passedTest");
        localStorage.removeItem("acceptEmails");
        localStorage.removeItem("postalCode");
    }
}

interface IPayload {
    user: {
        _id: string;
        authenticationToken: string;
        firstName: string;
        lastName: string;
        activated: boolean;
        passedTest: boolean;
        email: string;
        acceptEmails: boolean;
        postalCode: string;
    };
}