import { browser, by } from "protractor";
import { RedirectButton, TextInput, Element, Button } from "../../util/elements";

export class ChangePasswordDialog {
    oldPassText = new TextInput("oldPass");
    newPassText = new TextInput("newPass");
    verifyPassText = new TextInput("verifyPass");
    submitButton = new Button("requestButton");
    exitButton = new Button("exit");
    changePasswordMessageElement = new Element("changePasswordMessage");

    async fillOldPassText(oldPass: string) { await this.oldPassText.fillTextField(oldPass); }
    async fillNewPassText(newPass: string) { await this.newPassText.fillTextField(newPass); }
    async fillVerifyPassText(verifyPass: string) { await this.verifyPassText.fillTextField(verifyPass); }
    async clickSubmitButton() { await this.submitButton.clickButton(); }
    async clickExitButton() { await this.exitButton; }
    async getChangePasswordMessage(): Promise<string> { return await this.changePasswordMessageElement.getText(); }
    /** Returns true if the submit button is enabled, and false if it is disabled */
    async isSubmitButtonEnabled(): Promise<boolean> { return await this.submitButton.isEnabled(); }
}