import { LoginPage } from "../components/login.po";
import { SignupPage } from "../components/signup.po";
import { EmailAddress } from "../util/email";
import { ProfilePage } from '../components/profile.po';
import { async, TestBed } from "@angular/core/testing";
import { browser, logging } from "protractor";
import { ActivatePage } from '../components/activate.po';

/** A library of combined functions for standard actions involving multiple components */
export class ComponentActions {

    loginPage = new LoginPage();
    signupPage = new SignupPage();
    activatePage = new ActivatePage();
    profilePage = new ProfilePage();

    async createUser(email: EmailAddress, user?: any): Promise<any> {
        if (!user) {
            user = {
                email: await email.getAddress(),
                firstName: "test",
                lastName: "user",
                password: "password",
                confirmPassword: "password"
            }
        }
        await this.profilePage.navigateTo();
        await this.profilePage.clickSignupButton()
        await this.signupPage.fillForm(user);
        await this.signupPage.submitForm();
        await this.signupPage.acceptSignupEmail(email);
        await this.loginPage.navigateTo();
        await this.loginPage.fillForm(user);
        await this.loginPage.clickLoginButton();
        return user;
    }
}