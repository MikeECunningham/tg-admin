import { async, TestBed } from "@angular/core/testing";
import { browser, logging } from "protractor";
import { LoginPage } from "../components/login.po";
import { SignupPage } from "../components/signup.po";
import { EmailAddress } from "../util/email";
import { ActivatePage } from "../components/activate.po";
import { PasswordPage } from "../components/password.po"
import { ProfilePage } from "../components/profile.po";
import { ResetPasswordPage } from '../external/reset-password.po';
import { ChangePasswordDialog } from '../components/dialogs/change-password.do';
import { lstat } from 'fs';

describe("Authentication flow", async () => {
    const loginPage = new LoginPage();
    const signupPage = new SignupPage();
    const activatePage = new ActivatePage();
    const profilePage = new ProfilePage();
    const passPage = new PasswordPage();
    const changePassDialog = new ChangePasswordDialog();
    var user: any;
    const email = new EmailAddress();
    // The user to use for all the tests
    
    let resetPasswordPage: ResetPasswordPage;

    beforeAll(async () => {
        user = {
            email: await email.getAddress(),
            firstName: "test",
            lastName: "user",
            password: "password",
            confirmPassword: "password"
        };
    });

    beforeEach(async () => {
        await browser.waitForAngularEnabled(true);
        await loginPage.navigateTo();
    });


    // FAIL
    it("Should fail to login with unregistered user credentials", async () => {
        await loginPage.fillForm(user);
        await loginPage.clickLoginButton();
        expect(await loginPage.checkLoginMessage()).toBe(true, "This login should have failed");
    });

    // SUCCEED
    it("Should sign up a new user", async () => {
        await loginPage.clickSignupButton();
        await signupPage.fillForm(user);
        await signupPage.submitForm();
    });

    // SUCCEED
    it("Should verify that a verification email was sent", async () => {
        await email.getNewMail();
    });

    // FAIL
    it("Should fail to log unactivated user in", async () => {
        await loginPage.fillForm(user);
        await loginPage.clickLoginButton();
        expect(await activatePage.checkPage()).toBe(true, "We're not on the activation page");
    });

    // SUCCEED
    it("Should resend verification email and activate user", async () => {
        await activatePage.navigateTo();
        await activatePage.clickSendButton();
        await signupPage.acceptSignupEmail(email);
    });

    // SUCCEED
    it("Should log in, then out", async () => {
        await loginPage.fillForm(user);
        await loginPage.clickLoginButton();
        await profilePage.navigateTo();
        await profilePage.clickLogoutButton();
    });

    // SUCCEED
    it("Should request a password reset", async () => {
        await loginPage.clickForgotPasswordLink();
        await passPage.fillEmailResetText(user.email);
        await passPage.clickSendResetButton();
        resetPasswordPage = new ResetPasswordPage(await passPage.getResetPasswordUrl(email));
    });

    // FAIL
    it("Should fail to submit after mismatching the passwords", async () => {
        await browser.waitForAngularEnabled(false);
        await resetPasswordPage.navigateTo();
        await resetPasswordPage.fillPasswordText(user.password);
        await resetPasswordPage.fillPasswordConfirmText(user.password + "a");
        await resetPasswordPage.clickSubmitButton();
        await resetPasswordPage.waitForErrorResponse()
    });

    // SUCCEED
    it("Should reset the password and log in with the new password", async () => {
        await browser.waitForAngularEnabled(false);
        await resetPasswordPage.navigateTo();
        user.password += "1";
        await resetPasswordPage.fillPasswordText(user.password);
        await resetPasswordPage.fillPasswordConfirmText(user.password);
        await resetPasswordPage.clickSubmitButton();
        await browser.waitForAngularEnabled(true);
        await loginPage.navigateTo();
        await loginPage.fillForm(user);
        await loginPage.clickLoginButton();
    });

    // FAIL
    it("Should fail to click the Change Password button after malforming the request", async () =>{
        await profilePage.navigateTo();
        await profilePage.clickChangePasswordButton();
        expect(await changePassDialog.isSubmitButtonEnabled()).toBe(false, "Submit button enabled when form is empty");
        await changePassDialog.fillOldPassText(user.password);
        expect(await changePassDialog.isSubmitButtonEnabled()).toBe(false, "Submit button enabled when new password fields are empty");
        await changePassDialog.fillNewPassText("shrtpss");
        await changePassDialog.fillVerifyPassText("shrtpss");
        expect(await changePassDialog.isSubmitButtonEnabled()).toBe(false, "Submit button enabled when passwords are too short");
        await changePassDialog.fillVerifyPassText("wrngps");
        expect(await changePassDialog.isSubmitButtonEnabled()).toBe(false, "Submit button enabled when passwords too short and mismatched");
        await changePassDialog.fillNewPassText("mispassword");
        await changePassDialog.fillVerifyPassText("matchpassword");
        expect(await changePassDialog.isSubmitButtonEnabled()).toBe(false, "Submit button enabled when passwords mismatch");
        await changePassDialog.fillOldPassText("");
        expect(await changePassDialog.isSubmitButtonEnabled()).toBe(false, "Submit button enabled when passwords match and old pass is empty");
        await changePassDialog.fillOldPassText(user.password + "aaa");
        await changePassDialog.clickSubmitButton();
        expect(await changePassDialog.getChangePasswordMessage()).toBeDefined("Expected an error message from the server, got none");
    });

    // SUCCEED
    it("Should change the user's password", async () =>{
        await profilePage.navigateTo()
        await profilePage.clickChangePasswordButton();
        await changePassDialog.fillOldPassText(user.password);
        user.password = "newPassword";
        await changePassDialog.fillNewPassText(user.password)
        await changePassDialog.fillVerifyPassText(user.password);
        await changePassDialog.clickSubmitButton();
        await loginPage.navigateTo();
        await loginPage.fillForm(user);
        await loginPage.clickLoginButton();
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});