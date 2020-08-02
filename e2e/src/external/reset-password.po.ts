import { RedirectButton, TextInput, Element, Button, CheckboxInput } from "../util/elements";
import { ResetEmail } from "../emails/reset.eo";
import { EmailAddress } from "../util/email";
import { element, by, browser, ExpectedConditions } from "protractor";

export class ResetPasswordPage {

    url: string;

    constructor(url: string) {
        this.url = url;
    }

    errorMessage = new Element("errMsg");
    afterCompleteDiv = new Element("afterComplete");
    passwordText = new TextInput("password");
    passwordConfirmText = new TextInput("confirm_password");
    submitButton = new Button("submitButton");

    
    async fillPasswordText(password: string) { await this.passwordText.fillTextField(password); }
    async fillPasswordConfirmText(confirmPassword: string) { await this.passwordConfirmText.fillTextField(confirmPassword); }

    async clickSubmitButton() {
        await this.submitButton.clickButton();
    }

    /** Waits for submission error response to come back from the server */
    async waitForErrorResponse() {
        return await browser.wait(ExpectedConditions.visibilityOf(this.errorMessage.element));
    }

    /** Waits for submission success response to come back from the server */
    async waitForSubmitResponse() {
        await browser.wait(ExpectedConditions.visibilityOf(this.afterCompleteDiv.element));
    }

    async navigateTo() {
        await browser.get(this.url);
        await browser.sleep(2000);
    }
}