import { browser, by } from "protractor";
import { RedirectButton, TextInput, Element, Button } from "../../util/elements";

export class TestPassedDialog {

    emailInput = new TextInput("emailInput");
    nameInput = new TextInput("nameInput");
    addressInput = new TextInput("addressInput");
    requestButton = new RedirectButton("requestButton");

    async fillEmailInput(email: string) { await this.emailInput.fillTextField(email); }
    async fillNameInput(name: string) { await this.nameInput.fillTextField(name); }
    async fillAddressInput(address: string) { await this.addressInput.fillTextField(address); }
    async clickRequestButton() { await this.requestButton.clickButton(); }
    async isRequestButtonEnabled(): Promise<boolean> { return await this.requestButton.isEnabled(); }
}