import { browser} from "protractor";
import { RedirectButton, TextInput, Element, Button } from "../util/elements";
import { Page } from '../util/page';

export class LoginPage extends Page{

    loginButton = new RedirectButton("loginBtn");
    signupButton = new RedirectButton("signupBtn");
    email = new TextInput("emailTxt");
    password = new TextInput("passwordTxt");
    loginMessage = new Element("loginMessage");
    forgotPasswordLink = new Button("forgotPasswordLink");
    pageDiv = new Element("loginMainDiv");

    constructor(){ super("/"); }

    async fillEmail(email: string) {
        await this.email.fillTextField(email);
    }

    async fillPassword(password: string) {
        await this.password.fillTextField(password);
    }

    async clickSignupButton() {
        await this.signupButton.clickButton();
    }

    async clickLoginButton() {
        await this.loginButton.clickButton();
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.clickButton();
    }

    /**
     * Fills in the login form with the provided credentials
    **/
    async fillForm(user: { email: string, password: string }) {
        await this.fillEmail(user.email);
        await this.fillPassword(user.password);
    }

    async checkLoginMessage() {
        return await this.loginMessage.isDisplayed();
    }

    async checkPage() {
        return await this.pageDiv.isDisplayed();
    }
}
