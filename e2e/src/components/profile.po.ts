import { browser, by } from "protractor";
import { RedirectButton, TextInput, Element, Button, MatCheckboxInput } from "../util/elements";
import { Page } from '../util/page';

export class ProfilePage extends Page {

    editProfileButton = new Button("editProfileButton");
    cancelEditModeButton = new Button("cancelButton");
    logoutButton = new RedirectButton("logoutButton");
    sendCardButton = new RedirectButton("sendCardButton");
    testButton = new RedirectButton("testButton");
    changePasswordButton = new RedirectButton("changePasswordButton");
    signupButton = new RedirectButton("signupButton");
    loginButton = new RedirectButton("loginButton");
    deleteButton = new RedirectButton("deleteButton");
    emailCheckbox = new MatCheckboxInput("emailsCheckButton", by.CSS);
    firstNameText = new TextInput("firstNameEditText");
    lastNameText = new TextInput("lastNameEditText");

    constructor(){ super("menu/3"); }

    async clickLogoutButton() { await this.logoutButton.clickButton(); }
    async clickLoginButton() { await this.loginButton.clickButton(); }
    async clickCancelEditModeButton() { await this.cancelEditModeButton.clickButton(); }
    async clickSendCardButton() { await this.sendCardButton.clickButton(); }
    async clickTestButton() { await this.testButton.clickButton(); }
    async clickChangePasswordButton() { await this.changePasswordButton.clickButton(); }
    async clickSignupButton() { await this.signupButton.clickButton(); }
    async clickDeleteButton() { await this.deleteButton.clickButton(); }
    async clickEmailCheckbox() { await this.emailCheckbox.clickCheckbox(); }
    async fillFirstNameText(firstName: string) { await this.firstNameText.fillTextField(firstName); }
    async fillLastNameText(lastName: string) { await this.lastNameText.fillTextField(lastName); }
    async getFirstNameText(): Promise<string> { return await this.firstNameText.getText(); }
    async getLastNameText(): Promise<string> { return await this.lastNameText.getText(); }
    async getEmailCheckbox(): Promise<boolean> { return await this.emailCheckbox.isChecked(); }

    async clickEditProfileButton() {
        await this.editProfileButton.clickButton();
        await browser.sleep(1000);
    }

    async editProfile(firstName: string, lastName: string, toggleEmailCheckbox: boolean) {
        await this.clickEditProfileButton();
        await this.fillFirstNameText(firstName);
        await this.fillLastNameText(lastName);
        if (toggleEmailCheckbox) await this.clickEmailCheckbox();
        await this.clickEditProfileButton();
    }

    /** Performs editProfile() with preset modifications to the data, for convenience */
    async performEditProfile() {
        await this.editProfile(
            await this.getFirstNameText() + "a",
            await this.getLastNameText() + "a",
            true );
    }
}